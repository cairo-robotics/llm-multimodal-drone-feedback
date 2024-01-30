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

    return jsonify({'message': "User ID processed"})

@app.route('/process_trial_start', methods=['POST'])
def process_trial_start():
    data = request.json
    user_id = data['user_id']
    trial = data['trial']

    # start log file
    add_log_entry(user_id, f"Trial {trial} started")

    with open(f"Data/{user_id}/trial_{trial}.txt", "w") as f:
        # make empty file for trial data
        pass

    return jsonify({'message': "Trial started"})

def add_log_entry(user_id, entry):
    with open(f"Data/{user_id}/log.txt", "a") as f:
        f.write(f"{datetime.now()}: {entry}\n")


if __name__ == '__main__':
    app.run(debug=True)