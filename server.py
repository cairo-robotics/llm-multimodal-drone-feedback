from flask import Flask, render_template, request, jsonify, send_from_directory
import os
import feedback
from datetime import datetime
import pandas as pd

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/process_user_id', methods=['POST'])
def process_user_id():
    data = request.json
    user_id = data['user_id']

    # make folder for user data
    user_path = f"static/data/{user_id}"
    if not os.path.isdir(user_path):
        os.mkdir(user_path)

    # start log file
    add_log_entry(user_id, "Received user ID, start log")

    # create file for survey responses
    with open(f"static/data/{user_id}/survey_responses.csv", "w") as f:
        f.write("trial,survey1,survey2,survey3\n")

    return jsonify({'message': "User ID processed"})

@app.route('/process_trial_start', methods=['POST'])
def process_trial_start():
    data = request.json
    user_id = data['user_id']
    trial = data['trial']

    # make folder for trial data
    trial_path = f"static/data/{user_id}/trial_{trial}"
    if not os.path.isdir(trial_path):
        os.mkdir(trial_path)

    # start log file
    add_log_entry(user_id, f"Trial {trial} started")

    # create file for trial data
    with open(f"static/data/{user_id}/trial_{trial}/trajectory.csv", "w") as f:
        f.write("x,y_js,vx,vy,phi,ux,uy_js\n")

    return jsonify({'message': "Trial started"})

@app.route('/process_survey_responses', methods=['POST'])
def process_survey_responses():
    data = request.json
    user_id = data['user_id']
    trial = data['trial']
    trustVal = data['trust']
    confVal = data['conf']
    autoAgreeVal = data['autoAgree']

    # start log file
    add_log_entry(user_id, f"Received survey responses")

    with open(f"static/data/{user_id}/survey_responses.csv", "a") as f:
        f.write(f"{trial},{trustVal},{confVal},{autoAgreeVal}\n")

    return jsonify({'message': "Survey responses received"})

@app.route('/process_trajectory', methods=['POST'])
def process_trajectory():
    data = request.json
    user_id = data['user_id']
    trial = data['trial']
    log = data['log']

    # start log file
    add_log_entry(user_id, f"Received trajectory data")

    with open(f"static/data/{user_id}/trial_{trial}/trajectory.csv", "a") as f:
        f.write(log)

    # fix y positions
    df = pd.read_csv(f"static/data/{user_id}/trial_{trial}/trajectory.csv")
    df['y_py'] = -(df['y_js'] - 600)
    df['uy_py'] = -df['uy_js']
    df.to_csv(f"static/data/{user_id}/trial_{trial}/trajectory.csv", index=False)

    return jsonify({'message': "Trajectory data received"})

@app.route('/get_trajectory_image/<user_id>/<trial>')
def get_trajectory_image(user_id, trial):
    feedback.main(user_id, trial)
    image_path = f'static/data/{user_id}/trial_{trial}/trajectory_with_feedback.png'
    return send_from_directory('static', image_path)

def add_log_entry(user_id, entry):
    with open(f"static/data/{user_id}/log.txt", "a") as f:
        f.write(f"{datetime.now()}: {entry}\n")


if __name__ == '__main__':
    app.run(debug=True)