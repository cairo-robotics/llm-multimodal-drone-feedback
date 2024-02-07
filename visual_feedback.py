import matplotlib.pyplot as plt
from matplotlib.patches import Ellipse
import pandas as pd

class VisualFeedback:
    def __init__(self, userid, trial):
        self.userid = userid
        self.trial = trial
        self.traj_file = f"./static/data/{userid}/trial_{trial}/trajectory.csv"
        self.robustness_file = f"./static/data/{userid}/trial_{trial}/robustness.csv"

    def plot_trajectory(self):
        """
        Plot the trajectory of the drone.

        Parameters
        ----------
        None.

        Returns
        -------
        None. Saves axes to add overlay.
        """

        trajectory = pd.read_csv(self.traj_file)
        _, ax = plt.subplots() 

        ax.plot(trajectory["x"], trajectory["y_py"], 'k', linewidth=0.7) # whole trajectory
        ax.plot(trajectory["x"].iloc[-1], trajectory["y_py"].iloc[-1], 'r*', markersize=8) # end point
        ax.plot(trajectory["x"].iloc[0], trajectory["y_py"].iloc[0], 'g*', markersize=8) # start point

        # plot a rectangle for landing pad
        ax.fill([675, 675, 875, 875], [0, 31, 31, 0], color='gray', alpha=0.5)

        # set the display options
        ax.set_xlabel("x position")
        ax.set_ylabel("y position")
        ax.set_xlim(0, 1250)
        ax.set_ylim(0, 600)
        # make axes equal
        ax.set_aspect('equal')

        # save plot for later
        self.plot = ax
        plt.savefig(f"./static/data/{self.userid}/trial_{self.trial}/trajectory.png")

    def calc_location(self):
        """
        Calculate the location of the overlay using worst robustness values.

        Parameters
        ----------
        None.

        Returns
        -------
        location : tuple
            The location of the center of the overlay.
        """

        robustness = pd.read_csv(self.robustness_file)
        trajectory = pd.read_csv(self.traj_file)

        # get index of worst robustness value for improvement area column
        if "boundary" in self.improvement_area:
            worst_index = -1
        elif "landing" in self.improvement_area:
            worst_index = robustness[self.improvement_area][:-50].idxmin() # force end of trajectory
        else:
            # find highest total control effort
            worst_index = (trajectory["ux"].abs() + trajectory["uy"].abs()).idxmax()

        # get x and y values at worst index from trajectory file
        x = trajectory["x"].iloc[worst_index]
        y = trajectory["y_py"].iloc[worst_index]

        return (x, y)

    def add_overlay(self, location, width=60, height=60):
        """
        Add an oval overlay to a plot.

        Parameters
        ----------
        location : tuple
            The location of the center of the overlay.
        width : int
            The width of the overlay.
        height : int
            The height of the overlay.

        Returns
        -------
        None. Saves new image to file.
        """

        self.plot.add_patch(Ellipse(location, width, height, color='blue', alpha=0.35))

    def save_final_trajectory(self):
        """
        Save the final trajectory plot to file.
        """

        plt.savefig(f"./static/data/{self.userid}/trial_{self.trial}/trajectory_with_feedback.png")
        plt.close()

    def generate_visual_feedback(self):
        # generate the trajectory plot
        self.plot_trajectory()
        location = self.calc_location()
        self.add_overlay(location)
        
        # save the plot
        self.save_final_trajectory()