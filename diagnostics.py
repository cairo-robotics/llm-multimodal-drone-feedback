import pandas as pd
from math import pi

class Diagnostics:
    def __init__(self, userid, trial, preWindow=50):
        """Initialize the estimator class for a given file"""
        self.userid = userid
        self.trial = trial
        self.traj_file = f"./static/data/{userid}/trial_{trial}/trajectory.csv"
        self.preWindow = preWindow
        self.data = self.load_file()
        self.robustnessTerms = ['left_boundary', 'right_boundary', 'top_boundary', 'bottom_boundary',
                           'landing_left', 'landing_right', 'landing_speed', 'landing_angle']
        self.robustness = pd.DataFrame(index=self.data.index, columns=self.robustnessTerms)

    def load_file(self):
        """Load the file into a pandas dataframe"""
        return pd.read_csv(self.traj_file)

    def robustness_left_boundary(self):
        """Compute the robustness of the safety property for left x boundary"""
        # calculate distance to left boundary (x = 0) at every time point
        # x position greater than 0 gives positive robustness
        x_left = self.data['x']

        # calculate robustness
        self.robustness['left_boundary'] = x_left

    def robustness_right_boundary(self):
        """Compute the robustness of the safety property for right x boundary"""
        # calculate distance to right boundary (x = 1210) at every time point
        # x position less than 1210 gives positive robustness
        x_right = 1210 - self.data['x']

        # calculate robustness
        self.robustness['right_boundary'] = x_right

    def robustness_bottom_boundary(self):
        """Compute the robustness of the safety property for bottom y boundary"""
        # calculate distance to bottom boundary (y_py = 25) at every time point
        # y position greater than 25 gives positive robustness
        y_bottom = self.data['y_py'] - 25

        # calculate robustness
        self.robustness['bottom_boundary'] = y_bottom

    def robustness_top_boundary(self):
        """Compute the robustness of the safety property for top y boundary"""
        # calculate distance to top boundary (y_py = 600) at every time point
        # y position less than 600 gives positive robustness
        y_top = 600 - self.data['y_py']

        # calculate robustness
        self.robustness['top_boundary'] = y_top

    def robustness_landing_left(self):
        """Compute the robustness of the landing property for left x boundary"""
        # calculate distance to left boundary (x = 650) at every time point
        # x position greater than 650 gives positive robustness
        x_left = self.data['x'] - 650

        # calculate robustness
        self.robustness['landing_left'] = x_left

    def robustness_landing_right(self):
        """Compute the robustness of the landing property for right x boundary"""
        # calculate distance to right boundary (x = 850) at every time point
        # x position less than 850 gives positive robustness
        x_right = 850 - self.data['x']

        # calculate robustness
        self.robustness['landing_right'] = x_right

    def robustness_landing_speed(self):
        """Compute the robustness of the landing property for speed"""
        # calculate speed at every time point
        # vx should be less than 2 and vy should be less than 15 ~ 15 m/s 
        # speed less than 15 gives positive robustness
        speed = (self.data['vx']**2 + self.data['vy']**2)**0.5

        # calculate robustness
        self.robustness['landing_speed'] = 15 - speed

    def robustness_landing_angle(self):
        """Compute the robustness of the landing property for angle"""
        # calculate angle at every time point
        # angle less than 5 gives positive robustness
        angle = self.data['phi']
        self.robustness['landing_angle'] = 5 - angle.abs()

    def calculate_robustness(self):
        """Compute the robustness of all properties"""
        self.robustness_left_boundary()
        self.robustness_right_boundary()
        self.robustness_bottom_boundary()
        self.robustness_top_boundary()
        self.robustness_landing_left()
        self.robustness_landing_right()
        self.robustness_landing_speed()
        self.robustness_landing_angle()

        # save robustness to file
        self.robustness.to_csv(f"./static/data/{self.userid}/trial_{self.trial}/robustness.csv", index=False)

    def summary(self):
        """Print summary of what happened before a violation"""
        summaryTable = pd.DataFrame(index=self.robustnessTerms+['throttle', 'tilt'], columns=['average_all', 'min_all', 'average_end', 'min_end'])
        self.robustness['throttle'] = self.data['uy_py'].abs()
        self.robustness['tilt'] = self.data['ux'].abs()

        # summarize robustness over entire trajectory
        summaryVars = self.robustnessTerms + ['throttle', 'tilt']
        summaryTable['average_all'] = self.robustness[summaryVars].mean().round(3)
        summaryTable['min_all'] = self.robustness[summaryVars].min().round(3)
        
        # summarize robustness over last preWindow points
        selectedWindow = self.robustness[summaryVars].iloc[-self.preWindow:]
        summaryTable['average_end'] = selectedWindow.mean().round(3)
        summaryTable['min_end'] = selectedWindow.min().round(3)

        # format text output
        summary = "[start of summary]\n"
        # check if min_end values for boundary and landing components are all positive
        if (summaryTable[:8]['min_end'] > 0).all():
            summary += "The drone pilot successfully completed the task.\n"
        else:
            summary += "The drone pilot did not successfully complete the task.\n"
        summary += summaryTable.to_string()
        summary += "\n[end of summary]"

        return summary
    
    def find_area_of_improvement(self):
        """Heuristics for choosing important component"""

        # identify if there was boundary violation
        if (self.robustness['left_boundary'] <= 0).any():
            return 'left_boundary'
        elif (self.robustness['right_boundary'] <= 0).any():
            return 'right_boundary'
        elif (self.robustness['bottom_boundary'] <= 0).any():
            return 'bottom_boundary'
        elif (self.robustness['top_boundary'] <= 0).any():
            return 'top_boundary'
        
        # identify if there was landing violation
        if self.robustness['landing_left'].iloc[-1] <= 0:
            return 'landing_left'
        elif self.robustness['landing_right'].iloc[-1] <= 0:
            return 'landing_right'
        elif self.robustness['landing_speed'].iloc[-1] <= 0:
            return 'landing_speed'
        elif self.robustness['landing_angle'].iloc[-1] <= 0:
            return 'landing_angle'
        
        # check smoothness and efficiency
        if len(self.data)/20 > 28: # avg time for successful trials is 28 seconds at 20 Hz
            return 'efficiency'
        else:
            return 'smoothness'
 
    def run(self):
        self.calculate_robustness()
        self.robustness_summary = self.summary()
        self.improvement_area = self.find_area_of_improvement()