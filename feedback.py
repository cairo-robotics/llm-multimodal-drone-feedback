import base64
import requests
import dotenv

from datetime import datetime
from diagnostics import *
from visual_feedback import *

async def main(userid, trial):
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
  with open(f"./static/data/{userid}/log.txt", "a") as f:
      f.write(f"{datetime.now()}: Improvement area is {diagnostics.improvement_area}")

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
  feedback_prompt += """
  Image Context:
  1. The left vertical black line corresponds to x = 0.
  2. The right vertical black line corresponds to x = 1250.
  3. The top horizontal black line corresponds to y = 600.
  4. The bottom horizontal black line corresponds to y = 0.
  5. The gray rectangle is the landing pad with coordinates 650 < x < 850 and 0 < y < 55.
  6. The green star is the starting position of the drone.
  7. The red star is the ending position of the drone.
  8. The black curve is the trajectory of the drone as the pilot attempts to complete the target task.

  Target Task:
  1. The state variables are the drone's x position in meters (x), y position in meters (y), speed in meters per second (s), and tilt angle in degrees (\phi)
  2. The task is defined using signal temporal logic specifications, which are indicated using $…$
  3. Safety component: $P_1 = x > 0 \land x < 1250 \land y > 0 \land y < 600$
  4. Landing component: $P_2 = x > 650 \land x < 850 \land y < 35 \land s < 15 \land \phi > -5 \land \phi < 5$
  5. Complete task: $P_1 Until P_2$
  """

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
  8. Replace {actionable} with a specific control action strategy the pilot can make to improve in {top_improvement}. The possible control actions are thrust (moves the drone up or down) and tilt (moves the drone left or right). Only reference these control actions. Do not reference other control actions.
  9. Replace {reflection} with a task or question that encourages the pilot to reflect on their performance and decide what they can improve on their next attempt.
  10. Replace {confidence} with one or two sentences expressing confidence in the pilot's abilities to achieve at a high level on the target task.

  Remember, your feedback should be in the form of a paragraph. Do not use the phrase "top_improvement" or "{top_improvement}" in your feedback. Replace these with the actual improvement area you identified.
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
  output = output.replace('\u2014', '-')
  output = output.replace('\u2013', '-')
  output = output.replace('\u2019', "'")

  # catch any other unicode characters
  try:
    output.encode('ascii')
  except UnicodeEncodeError as e:
    print(e)

  # generate visual feedback
  visuals.improvement_area = diagnostics.improvement_area
  visuals.generate_visual_feedback()

  # save feedback to file
  with open(f"./static/data/{userid}/trial_{trial}/feedback.txt", "w") as f:
      f.write(output)

  with open(f"./static/data/{userid}/log.txt", "a") as f:
      f.write(f"{datetime.now()}: Saved feedback to file.")
