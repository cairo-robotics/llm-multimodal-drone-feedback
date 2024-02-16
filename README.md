# Set up
- Set up virtual environment: `python -m venv ./venv`. Examples are for Windows.
- Activate virtual environment: `venv/Scripts/activate`.
- Update pip: `venv/Scripts/python.exe -m pip install --upgrade pip`
- Install packages: `pip install -r requirements.txt`
- In the same directory as the script(s), create a .env file that sets the OPENAI_API_KEY variable to your OpenAI API key. It should have the format: `OPENAI_API_KEY="your_key_here"`.

# How to run locally
- activate virtual environment
- in this directory, run `python server.py`
- open http:localhost:5000

# What to work on next
- send new cost estimate to Sriram
- submit PV form
- get public server working
- finalize Prolific study details online
- figure out how to not time-out on GPT when running participants