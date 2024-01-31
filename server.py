from flask import Flask, render_template, request, jsonify
import os
from datetime import datetime

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/process_user_id', methods=['POST'])
def process_user_id():
    data = request.json
    user_id = data['user_id']

    # make folder for user data
    user_path = f"Data/{user_id}"
    if not os.path.isdir(user_path):
        os.mkdir(f"Data/{user_id}")

    # start log file
    add_log_entry(user_id, "Received user ID, start log")

    # create file for survey responses
    with open(f"Data/{user_id}/survey_responses.csv", "w") as f:
        f.write("trial,survey1,survey2,survey3\n")

    return jsonify({'message': "User ID processed"})

@app.route('/process_trial_start', methods=['POST'])
def process_trial_start():
    data = request.json
    user_id = data['user_id']
    trial = data['trial']

    # start log file
    add_log_entry(user_id, f"Trial {trial} started")

    # create file for trial data
    with open(f"Data/{user_id}/trial_{trial}.csv", "w") as f:
        f.write("x,y,vx,vy,u_1,u_2,phi,phi_dot\n")

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

    with open(f"Data/{user_id}/survey_responses.csv", "a") as f:
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

    with open(f"Data/{user_id}/trial_{trial}.csv", "a") as f:
        f.write(log)

    return jsonify({'message': "Trajectory data received"})

def add_log_entry(user_id, entry):
    with open(f"Data/{user_id}/log.txt", "a") as f:
        f.write(f"{datetime.now()}: {entry}\n")


if __name__ == '__main__':
    app.run(debug=True)