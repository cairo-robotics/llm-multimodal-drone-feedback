This README outlines the steps to deploy a Flask application on a Red Hat Linux instance using Gunicorn on port 5000 and Nginx as a reverse proxy. Follow these instructions to set up your project environment, deploy your Flask application, ensure it runs successfully with Gunicorn, and configure Nginx.

**Warning**: These steps make it look a lot easier than I experienced trying to get this set up the first time. I tried to distill my multiple false starts into a coherent document. You may need to try rearranging some steps or reloading the firewall/Nginx multiple times to get things working. Hopefully your journey will be easier than mine!

# Preliminary Steps
1. [Request a managed instance](https://www.colorado.edu/cs/content/managed-cloud-instance-request) from the CS IT team. Make sure you ask them to make a SSL certificate and key for you. The instance should be public (not internal). For the rest of the steps, I will assume the instance is called `dronefeedback.colorado.edu`.
2. While on the UCB VPN, log into your instance. For the rest of the steps, I will assume the identikey is `emje6419`.
```
ssh emje6419@dronefeedback.colorado.edu
```

# System Update and Package Installation
Update system packages and get python set up:
```
sudo yum update -y
sudo yum install git python3-devel -y
sudo yum groupinstall 'Development Tools' -y
pip3 install virtualenv
```

# Configure Github CLI
1. Install the [Github CLI package](https://github.com/cli/cli/blob/trunk/docs/install_linux.md#fedora-centos-red-hat-enterprise-linux-dnf):
```
sudo dnf install gh
sudo dnf update gh
```
2. Create a [personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic). Make sure you have enabled 'repo', 'read:org', and 'workflow' scopes.
3. Log in to GitHub using personal access token 
```
gh auth login
```
# Set Up Flask Project
1. Set up your virtual environment in your project directory
```
mkdir myflaskapp
cd myflaskapp
python3 -m virtualenv venv
source venv/bin/activate
```
2. Clone this repository and install dependencies
```
git clone https://github.com/cairo-robotics/llm-multimodal-drone-feedback.git
cd llm-multimodal-drone-feedback
pip install -r requirements.txt
```
3. Set up your OpenAI key (replace XXX with your key)
```
echo OPENAI_API_KEY="XXX" >> .env
```
4. Connect Flask and Gunicorn. 
```
export FLASK_ENV=development
export FLASK_APP = server.py
gunicorn --workers 3 --bind 0.0.0.0:5000 wsgi:app --log-file /home/emje6419/myflaskapp/mygunicorn.log
```
5. Check that you can access your project at `http://<server-ip>:5000`. You can get your server IP using `curl -4 icanhazip.com`

6. Shut down server for now using `CTRL+C`.

# Set up Nginx
Instructions are based off of [this website](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/8/html/deploying_different_types_of_servers/setting-up-and-configuring-nginx_deploying-different-types-of-servers).

1. Install Nginx package
```
sudo yum install nginx
```

2. Move the configuration file from this repo to the Nginx directory. Make sure to update `server_name` with your specific name and the SSL certificate/key locations.
```
mv myflaskapp.conf /etc/nginx/conf.d
```

3. Test and Start Nginx
```
sudo systemctl enable nginx
sudo systemctl start nginx
```

4. Open relevant ports and reload firewall
```
sudo firewall-cmd --permanent --add-port=80/tcp
sudo firewall-cmd --permanent --add-port=443/tcp
sudo firewall-cmd --zone=public --add-port=5000/tcp --permanent
sudo firewall-cmd --reload
```

5. Check that you can see the system test page by navigating to `http://<server-ip>`.

# Final Steps
1. Start a tmux session
```
sudo yum install tmux -y
tmux new -s mysession
```
2. Make sure the experiment is set to the appropriate feedback condition in the `Experiment.js` file.
3. Start your server in the tmux session (your virtual environment should already be activated)
```
gunicorn --workers 3 --bind 0.0.0.0:5000 wsgi:app --log-file /home/emje6419/myflaskapp/mygunicorn.log
```
If you are feeling really fancy, you can try to create a service that will automatically run this. I gave up after struggling with SELinux policy permissions for several hours.

4. Detatch from your tmux session using `CTRL+B` then `d`. You can attach later using `tmux attach -t mysession`.
5. Check you can access your project at `https://dronefeedback.colorado.edu`. Congrats, you did it!

# Transfer Data Back to Windows
1. Open Git Bash
2. Make a folder on Windows where you want your data to be stored
3. Use SCP to copy files
```
scp -r emje6419@dronefeedback.colorado.edu:/home/emje6419/myflaskapp/llm-multimodal-drone-feedback/static/data 'C:/Users/Emily Jensen/OneDrive - UCB-O365/Drone Feedback Data'
```

# Thoughts to improve feedback
- make prompt less wordy?
- refine compliment conditions?
- how to change frequency/content over time?
