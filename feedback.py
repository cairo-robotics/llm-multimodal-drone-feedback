import base64
import requests
import dotenv

from diagnostics import *
from visual_feedback import *
from server import add_log_entry

def main(userid, trial):
  # OpenAI API Key
  config = dotenv.dotenv_values(".env")
  api_key = config["OPENAI_API_KEY"]

  # Function to encode the image
  def encode_image(image_path):
      with open(image_path, "rb") as image_file:
          return base64.b64encode(image_file.read()).decode('utf-8')

  # Path to files
  diagnostics = Diagnostics(userid, trial)
  diagnostics.run()
  add_log_entry(userid, f"Improvement area: {diagnostics.improvement_area}")
  #print(diagnostics.robustness_summary)

  visuals = VisualFeedback(userid, trial)
  visuals.plot_trajectory()

  # Getting the base64 string
  base64_image = encode_image(f"./static/data/{userid}/trial_{trial}/trajectory.png")

  headers = {
      "Content-Type": "application/json",
      "Authorization": f"Bearer {api_key}"
  }

  feedback_prompt = """
  You are a friendly and helpful tutor. You are giving feedback to a drone pilot who is learning to fly a drone."""

  feedback_prompt += """
  Give feedback to a drone pilot in the following format:
  {compliment} {improvement_area} {actionable} {reflection} {confidence}
  """


  #{
  #    "area of improvement": "{top_improvement}",
  #    "violations": "{violations}",
  #    "feedback": "{compliment} {improvement_area} {actionable} {reflection} {confidence}"
  #}

  feedback_prompt += """
  Image Context:
  1. The left vertical black line corresponds to x = -30.
  2. The right vertical black line corresponds to x = 30.
  3. The top horizontal black line corresponds to y = 33.75.
  4. The bottom horizontal black line corresponds to y = 0.
  5. The gray rectangle is the landing pad with coordinates -9.8 < x < 9.8 and 0 < y < 1.8.
  6. The green asterisk is the starting position of the drone.
  7. The red asterisk is the ending position of the drone.
  8. The black curve is the trajectory of the drone as the pilot attempts to complete the target task.

  Target Task:
  1. The state variables are the drone's x position in meters (x), y position in meters (y), speed in meters per second (s), and attitude angle in degrees (\phi)
  2. The task is defined using signal temporal logic specifications, which are indicated using $…$
  3. Safety component: $P_1 = x > -30 \land x < 30 \land y > 0 \land y < 33.75$
  4. Landing component: $P_2 = x > -9.8 \land x < 9.8 \land y < 5 \land s < 5 \land \phi > -10 \land \phi < 10$
  5. Complete task: $P_1 Until P_2$
  """

  # Performance Summary:
  # 1. The summary starts with [start of summary] and ends with [end of summary].
  # 2. The summary includes a table of robustness values for each component of the task. Robustness is calculated using the specifications given in the target task. Negative robustness means the component was violated and positive robustness means the component was satisfied.
  # 3. For each component, the average robustness is calculated over the entire trajectory (all) and the end of the trajectory. The minimum (worst) robustness is calculated over the entire trajectory and the end of the end of the trajectory.
  # 4. The range of possible robustness values for each component is:
  #     - left_boundary: [0, 60] 
  #     - right_boundary: [0, 60] 
  #     - top_boundary: [0, 33.75] 
  #     - bottom_boundary: [0, 33.75] 
  #     - landing_left: [-20.2, 39.8] 
  #     - landing_right: [-20.2, 39.8] 
  #     - landing_speed: [-40, 5] 
  #     - landing_angle: [-180, 10]
  # 5. Thrust inputs are in the range [-1, 1] and roll inputs are in the range [-1, 1].
  # 6. A component is violated if the min_end entry in the table below is 0 or negative.
  # 7. Evaluate smoothness by looking at the trajectory and the average thrust and roll inputs. A smooth trajectory is one that does not have sharp turns or sudden changes in speed.
  # 8. Evaluate efficiency by looking at the trajectory and the average thrust and roll inputs. An efficient trajectory is one that does not have unnecessary movements or large deviations from the target task.

  #feedback_prompt += "\n" + diagnostics.robustness_summary + "\n"

  feedback_prompt += """
  Rules:
  1. Make decisions using the provided image of the drone trajectory, image context, and target task information.
  2. You can assume the dynamics of the drone allow the pilot to achieve the task. 
  3. Do not add additional elements to the feedback not shown above. Only use the elements given in the template.
  4. Do not use mention math, logic, or robustness terms when describing the task. Only use natural language to describe elements of the task.
  """

  feedback_prompt += """
  5. The area the pilot can most improve in is """ + diagnostics.improvement_area + """. This will be referred to as {top_improvement}.
  """

  feedback_prompt += """
  6. Replace {compliment} with one or two sentences describing a positive aspect of the pilot's performance relative to the target task. If {top_improvement} is smoothness or efficiency, congratulate the pilot on successfully completing the task. If {top_improvement} is landing, congratulate the pilot on avoiding a crash.
  7. Replace {improvement_area} with a description of which part of the target task the pilot can most improve in, which I identified as {top_improvement}. Specifically refer to a component of the task rather than an overall assessment of the performance.
  8. Replace {actionable} with a specific control action strategy the pilot can make to improve in {top_improvement}. The possible control actions are throttle (moves the drone up or down) and roll (tilts the drone left or right). Only reference these control actions. Do not reference other control actions.
  9. Replace {reflection} with a task or question that encourages the pilot to reflect on their performance and decide what they can improve on their next attempt.
  10. Replace {confidence} with one or two sentences expressing confidence in the pilot's abilities to achieve at a high level on the target task.

  Remember, your feedback should be in the form of a paragraph.
  """

  payload = {
      "model": "gpt-4-vision-preview",
      "messages": [
        {
          "role": "user",
          "content": [
            {
              "type": "text",
              "text": feedback_prompt
            },
            {
              "type": "image_url",
              "image_url": {
                "url": f"data:image/jpeg;base64,{base64_image}"
              }
            }
          ]
        }
      ],
      "max_tokens": 700
  }

  response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)
  output = response.json()['choices'][0]['message']['content']

  # generate visual feedback
  visuals.improvement_area = diagnostics.improvement_area
  visuals.generate_visual_feedback()

  # save feedback to file
  with open(f"./static/data/{userid}/trial_{trial}/feedback.txt", "w") as f:
      f.write(output)