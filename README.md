# Set up
- Set up virtual environment: `python -m venv ./venv`. Examples are for Windows.
- Activate virtual environment: `venv/Scripts/activate`.
- Update pip: `venv/Scripts/python.exe -m pip install --upgrade pip`
- Install packages: `pip install -r requirements.txt`
- In the same directory as the script(s), create a .env file that sets the OPENAI_API_KEY variable to your OpenAI API key. It should have the format: `OPENAI_API_KEY="your_key_here"`.

How to run locally
- activate virtual environment
- in this directory, run `python server.py`
- open http:localhost:5000

What to work on next
- make sure logs are comprehensive
- debug improvement area heuristic
- make feedback less wordy?
- save condition to log
- fix matplotlib gui warning
- fix weird characters in the output
- put in score table
- fix offsets in landing image