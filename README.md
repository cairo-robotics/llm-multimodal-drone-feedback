# Set up
- Set up virtual environment: 
    + `python -m venv ./venv` (Windows and Linux).
- Activate virtual environment: 
    + `venv/Scripts/activate` (Windows) or 
    + `source venv/bin/activate` (Linux).
- Update pip: 
    + `venv/Scripts/python.exe -m pip install --upgrade pip` (Windows) or 
    + `/home/emje6419/llm-multimodal-drone-feedback/venv/bin/python -m pip install --upgrade pip` (Linux)
- Install packages: 
    + `pip install -r requirements.txt` (Windows and Linux)
- In the same directory as the script(s), create a .env file that sets the OPENAI_API_KEY variable to your OpenAI API key.
    + use a text editor (Windows) or 
    + `echo OPENAI_API_KEY="XXXXXX" >> .env` (Linux)

# How to run locally (Windows)
- activate virtual environment
- in this directory, run `python server.py`
- open http:localhost:5000

# How to make public server (Linux)
- connect to UCB VPN 
- log into instance `emje6419@dronefeedback.int.colorado.edu`
- install git `sudo yum install git`
- install [Github CLI](https://github.com/cli/cli/blob/trunk/docs/install_linux.md#fedora-centos-red-hat-enterprise-linux-dnf)
- create [personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic). Make sure you have enabled 'repo', 'read:org', and 'workflow' scopes.
- log in to github using personal access token `gh auth login`
- clone this repo `git clone https://github.com/cairo-robotics/llm-multimodal-drone-feedback.git`
- do setup instructions

# What to work on next
- get public server working
- finalize Prolific study details online
- make prompt less wordy
- refine compliment conditions