import pandas as pd
import os
import shutil
import scikit_posthocs as sp
import scipy.stats as stats
from statsmodels.miscmodels.ordinal_model import OrderedModel

data_dir = 'C:/Users/Emily Jensen/OneDrive - UCB-O365/Drone Feedback Data/data/'

# calculate total time spent on the experiment. applied to column of participant df
def calculate_total_time(user_id):
    log = pd.read_csv(data_dir + user_id + '/log.txt', sep=': ', names=['time','message'], parse_dates=['time'])
    start_time = log[log['message'].str.contains('Received user ID')].iloc[-1]['time'] # choose the last one in case they restarted
    end_time = log[log['message'].str.contains('qualtrics')].iloc[-1]['time'] # choose last one just to be consistent
    return end_time - start_time

# calculate total number of successful landings. applied to column of participant df
def calculate_n_successful(user_id):
    surveys = pd.read_csv(data_dir + user_id + '/survey_responses.csv')
    n_safe = len(surveys[surveys['outcome'] == 'Safe'])
    return n_safe

# calculate total number of unsuccessful landings. applied to column of participant df
def calculate_n_unsafe(user_id):
    surveys = pd.read_csv(data_dir + user_id + '/survey_responses.csv')
    n_unsafe = len(surveys[surveys['outcome'] == 'Unsafe'])
    return n_unsafe

# calculate total number of crashes. applied to column of participant df
def calculate_n_crash(user_id):
    surveys = pd.read_csv(data_dir + user_id + '/survey_responses.csv')
    n_crash = len(surveys[surveys['outcome'] == 'Crash'])
    return n_crash

# calculate time for each trial. applied to column of survey df
def calculate_trial_time(user_id, trial_num):
    log = pd.read_csv(data_dir + user_id + '/log.txt', sep=': ', names=['time','message'], parse_dates=['time'])
    trial_start_idx = log[log['message'].str.contains(f'Trial {trial_num} started')].iloc[-1].name
    start_time = log.loc[trial_start_idx]['time']
    end_time = log.loc[trial_start_idx+1]['time'] # next line is when trajectory data is sent to the server
    return end_time - start_time

# calculate time viewing and rating feedback for each trial. applied to column of survey df
def calculate_feedback_time(user_id, trial_num):
    log = pd.read_csv(data_dir + user_id + '/log.txt', sep=': ', names=['time','message'], parse_dates=['time'])
    trial_start_idx = log[log['message'].str.contains(f'Trial {trial_num} started')].iloc[-1].name
    start_time = log.loc[trial_start_idx+3]['time'] # saved feedback to file
    end_time = log.loc[trial_start_idx+4]['time'] # received survey responses
    return end_time - start_time

# calculate most common response to each survey question per participant. applied to column of participant df
def mode_survey_response(user_id, question, all_responses):
    part_df = all_responses[all_responses['prolific_id'] == user_id]
    return part_df[question].value_counts().index[0]

# systematically process data needed for analysis. does not override raw data
def load_data():
    # load raw data
    conditions_file = data_dir + 'conditions.csv'
    conditions = pd.read_csv(conditions_file)

    exit_survey_file = data_dir + 'exit_survey.csv'
    exit_survey = pd.read_csv(exit_survey_file)

    # remove test data from conditions file
    conditions['time'] = pd.to_datetime(conditions['time'])
    conditions = conditions[conditions['time'] >= '2024-04-10 11:15:00']
    conditions = conditions[~conditions['user_id'].str.contains('emily')]
    conditions['condition'] = pd.Categorical(conditions['condition'])

    # clean up columns and dtypes in exit survey file
    qualtrics_columns = {
        'StartDate': 'start_date',
        'EndDate': 'end_date',
        'Duration (in seconds)': 'duration',
        'Finished': 'is_finished', # 1 is finished
        'Q9': 'prolific_id', # user inputted prolific id
        'Q1': 'gender', # mapping below
        'Q8': 'age', # number input
        'Q3': 'drone_experience', # mapping below
        'Q4': 'video_game_experience', # mapping below
        'Q5': 'feedback_helped', # likert mapping below
        'Q6': 'change_from_feedback', # open text response
        'Q7': 'comments' # open text response, optional
    }

    exit_survey = exit_survey.rename(columns=qualtrics_columns)
    exit_survey = exit_survey.drop(columns=['Status', 'Progress', 'RecordedDate', 'ResponseId', 'DistributionChannel', 'UserLanguage'])
    exit_survey = exit_survey.drop([0,1])

    exit_survey['start_date'] = pd.to_datetime(exit_survey['start_date'])
    exit_survey['end_date'] = pd.to_datetime(exit_survey['end_date'])
    exit_survey['duration'] = pd.to_numeric(exit_survey['duration'])
    exit_survey['is_finished'] = exit_survey['is_finished'].astype(bool)
    exit_survey['age'] = pd.to_numeric(exit_survey['age'])

    # remove test data from exit survey file
    exit_survey = exit_survey[exit_survey['start_date'] >= '2024-04-10 11:15:00']

    # process categorical data
    exit_survey['gender'] = pd.Categorical(exit_survey['gender'])
    exit_survey = exit_survey[~exit_survey['prolific_id'].str.contains('emily')]

    drone_map = {'I have never flown a drone': "None", 
                'I have tried flying a drone a few times': "Some", 
                'I regularly fly drones': "Regularly", 
                'I am an expert or professional drone pilot': "Professional"}
    exit_survey['drone_experience'] = exit_survey['drone_experience'].replace(drone_map)
    exit_survey['drone_experience'] = pd.Categorical(exit_survey['drone_experience'], categories=['None', 'Some', 'Regularly', 'Professional'], ordered=True)

    game_map = {'I do not play video games': "None", 
                'I play video games at least once per month': "Monthly", 
                'I play video games at least once per week': "Weekly", 
                'I play video games almost every day': "Daily"}
    exit_survey['video_game_experience'] = exit_survey['video_game_experience'].replace(game_map)
    exit_survey['video_game_experience'] = pd.Categorical(exit_survey['video_game_experience'], categories=['None', 'Monthly', 'Weekly', 'Daily'], ordered=True)

    likert_map = {'1 - Strongly Disagree': "Strongly Disagree", 
                '2': "Disagree", 
                '3 - Neither agree nor disagree': "Neutral", 
                '4': "Agree", 
                '5 - Strongly Agree': "Strongly Agree"}
    exit_survey['feedback_helped'] = exit_survey['feedback_helped'].replace(likert_map)
    exit_survey['feedback_helped'] = pd.Categorical(exit_survey['feedback_helped'], categories=['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'], ordered=True)

    likert_map_collapsed = {'Strongly Disagree': "Disagree", 
                            'Disagree': "Disagree", 
                            'Neutral': "Neutral", 
                            'Agree': "Agree", 
                            'Strongly Agree': "Agree"}
    exit_survey['feedback_helped_collapsed'] = exit_survey['feedback_helped'].replace(likert_map_collapsed)
    exit_survey['feedback_helped_collapsed'] = pd.Categorical(exit_survey['feedback_helped_collapsed'], categories=['Disagree', 'Neutral', 'Agree'], ordered=True)

    # merge conditions into exit survey file
    merged = pd.merge(conditions, exit_survey, left_on='user_id', right_on='prolific_id', how='inner')
    merged = merged.drop(columns=['user_id'])

    # drop duplicate ids from people who restarted the experiment
    duplicate_ids = merged[merged.duplicated(subset='prolific_id', keep=False)]['prolific_id'].unique()
    duplicate_ids.sort()
    print(f"Dropped {len(duplicate_ids)} duplicate IDs:")
    print(duplicate_ids)
    merged = merged.drop_duplicates(subset='prolific_id', keep='first')

    # save merged dataframe to file
    participant_file = data_dir + 'participant_info.csv'
    merged.to_csv(participant_file, index=False)

    # remove participants that restarted after the first 5 trials
    remove_ids = ['5ef9f528c7ae587afa25fe9b', '6105c41aa4fe602501d5a8cc', 
                  '610796f1301fccdca446af57', '631f1b608af38f654d2a3b1f', 
                  '63ba10de73415d047e1d6731', '643c6175d46d41e74033994f', 
                  '65cba99c92b362b45e414da7']
    
    # remove participants that did not put in any effort
    remove_ids += ['63026a8fd8429b224cd2a134', '637d4196c70a66e28ecede34', '5f90581950d8520e8c7d3890']
    
    merged_filtered = merged[~merged['prolific_id'].isin(remove_ids)]

    # calculate time participants spent on whole experiment
    merged_filtered['total_time'] = merged_filtered['prolific_id'].apply(calculate_total_time)

    # calculate total number of each type of landing
    merged_filtered['n_safe_landings'] = merged_filtered['prolific_id'].apply(calculate_n_successful)
    merged_filtered['n_unsafe_landings'] = merged_filtered['prolific_id'].apply(calculate_n_unsafe)
    merged_filtered['n_crashes'] = merged_filtered['prolific_id'].apply(calculate_n_crash)
    

    # combine survey data from all remaining participants and trials
    responses = []

    for participant in merged_filtered['prolific_id']:
        surveys = pd.read_csv(data_dir + participant + '/survey_responses.csv')
        surveys['prolific_id'] = participant
        responses.append(surveys)

    all_responses = pd.concat(responses, ignore_index=True)

    # make survey responses categorical
    survey_likert_map = {'1': "Strongly Disagree", 
                        '2': "Disagree", 
                        '3': "Neutral", 
                        '4': "Agree", 
                        '5': "Strongly Agree"}
    likert_categories = ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']


    all_responses['motivation'] = all_responses['motivation'].apply(str)
    all_responses['motivation'] = all_responses['motivation'].replace(survey_likert_map)
    all_responses['motivation'] = pd.Categorical(all_responses['motivation'], categories=likert_categories, ordered=True)
    all_responses['motivation_collapsed'] = all_responses['motivation'].replace(likert_map_collapsed)
    all_responses['motivation_collapsed'] = pd.Categorical(all_responses['motivation_collapsed'], categories=['Disagree', 'Neutral', 'Agree'], ordered=True)

    all_responses['actionable'] = all_responses['actionable'].apply(str)
    all_responses['actionable'] = all_responses['actionable'].replace(survey_likert_map)
    all_responses['actionable'] = pd.Categorical(all_responses['actionable'], categories=likert_categories, ordered=True)
    all_responses['actionable_collapsed'] = all_responses['actionable'].replace(likert_map_collapsed)
    all_responses['actionable_collapsed'] = pd.Categorical(all_responses['actionable_collapsed'], categories=['Disagree', 'Neutral', 'Agree'], ordered=True)

    all_responses['reflection'] = all_responses['reflection'].apply(str)
    all_responses['reflection'] = all_responses['reflection'].replace(survey_likert_map)
    all_responses['reflection'] = pd.Categorical(all_responses['reflection'], categories=likert_categories, ordered=True)
    all_responses['reflection_collapsed'] = all_responses['reflection'].replace(likert_map_collapsed)
    all_responses['reflection_collapsed'] = pd.Categorical(all_responses['reflection_collapsed'], categories=['Disagree', 'Neutral', 'Agree'], ordered=True)

    manageable_likert_map = {'1': "Much too little",
                            '2': "Too little",
                            '3': "Just right",
                            '4': "Too much",
                            '5': "Much too much"}
    manageable_categories = ['Much too little', 'Too little', 'Just right', 'Too much', 'Much too much']
    manageable_likert_map_collapsed = {'Much too little': "Too little",
                                    'Too little': "Too little",
                                    'Just right': "Just right",
                                    'Too much': "Too much",
                                    'Much too much': "Too much"}

    all_responses['manageable'] = all_responses['manageable'].apply(str)
    all_responses['manageable'] = all_responses['manageable'].replace(manageable_likert_map)
    all_responses['manageable'] = pd.Categorical(all_responses['manageable'], categories=manageable_categories, ordered=True)
    all_responses['manageable_collapsed'] = all_responses['manageable'].replace(manageable_likert_map_collapsed)
    all_responses['manageable_collapsed'] = pd.Categorical(all_responses['manageable_collapsed'], categories=['Too little', 'Just right', 'Too much'], ordered=True)

    timely_likert_map = {'1': "Much too infrequent",
                        '2': "Too infrequent",
                        '3': "Just enough",
                        '4': "Too often",
                        '5': "Much too often"}
    timely_categories = ['Much too infrequent', 'Too infrequent', 'Just enough', 'Too often', 'Much too often']
    timely_likert_map_collapsed = {'Much too infrequent': "Too infrequent",
                                'Too infrequent': "Too infrequent",
                                'Just enough': "Just enough",
                                'Too often': "Too often",
                                'Much too often': "Too often"}

    all_responses['timely'] = all_responses['timely'].apply(str)
    all_responses['timely'] = all_responses['timely'].replace(timely_likert_map)
    all_responses['timely'] = pd.Categorical(all_responses['timely'], categories=timely_categories, ordered=True)
    all_responses['timely_collapsed'] = all_responses['timely'].replace(timely_likert_map_collapsed)
    all_responses['timely_collapsed'] = pd.Categorical(all_responses['timely_collapsed'], categories=['Too infrequent', 'Just enough', 'Too often'], ordered=True)

    all_responses['outcome'] = pd.Categorical(all_responses['outcome'], categories=['Crash', 'Unsafe', 'Safe'], ordered=True)

    # add column to survey file for feedback condition
    all_responses['condition'] = all_responses['prolific_id'].map(merged_filtered.set_index('prolific_id')['condition'])
    all_responses['condition'] = pd.Categorical(all_responses['condition'], categories=['score', 'text', 'full'], ordered=True)

    # calculate time spent on each trial and feedback
    all_responses['trial_time'] = all_responses.apply(lambda x: calculate_trial_time(x['prolific_id'], x['trial']), axis=1)
    all_responses['feedback_time'] = all_responses.apply(lambda x: calculate_feedback_time(x['prolific_id'], x['trial']), axis=1)
    all_responses['trial_time_seconds'] = all_responses['trial_time'].dt.total_seconds()
    all_responses['feedback_time_seconds'] = all_responses['feedback_time'].dt.total_seconds()

    # remove trials where time is over 99th percentile
    all_responses = all_responses[(all_responses['trial_time_seconds'] <= 123.46) & (all_responses['feedback_time_seconds'] <= 184.71)]

    # calculate average trial and feedback times for each participant and merge into participant file
    avg_trial_time = all_responses.groupby('prolific_id')['trial_time'].mean()
    avg_feedback_time = all_responses.groupby('prolific_id')['feedback_time'].mean()
    merged_filtered = pd.merge(merged_filtered, avg_trial_time, left_on='prolific_id', right_index=True)
    merged_filtered = pd.merge(merged_filtered, avg_feedback_time, left_on='prolific_id', right_index=True)
    merged_filtered = merged_filtered.rename(columns={'trial_time': 'avg_trial_time', 'feedback_time': 'avg_feedback_time'})
    merged_filtered['total_time_seconds'] = merged_filtered['total_time'].dt.total_seconds()
    merged_filtered['avg_trial_time_seconds'] = merged_filtered['avg_trial_time'].dt.total_seconds()
    merged_filtered['avg_feedback_time_seconds'] = merged_filtered['avg_feedback_time'].dt.total_seconds()

    # calculate most common response to each survey question
    questions = ['motivation', 'manageable', 'actionable', 'timely', 'reflection', 'motivation_collapsed', 'manageable_collapsed', 'actionable_collapsed', 'timely_collapsed', 'reflection_collapsed']
    
    for q in questions:
        merged_filtered[f'mode_{q}'] = merged_filtered['prolific_id'].apply(lambda x: mode_survey_response(x, q, all_responses))

    # create numerical codes to use in some models
    gender_dummies = pd.get_dummies(merged_filtered['gender'], prefix='gender')
    merged_filtered = pd.concat([merged_filtered, gender_dummies], axis=1)
    merged_filtered['gender_Non-binary'] = merged_filtered['gender_Non-binary'].astype(int)
    merged_filtered['gender_Woman'] = merged_filtered['gender_Woman'].astype(int)

    feedback_mapping = {category: code for code, category in enumerate(merged_filtered['feedback_helped'].cat.categories)}
    merged_filtered['feedback_helped_code'] = merged_filtered['feedback_helped'].map(feedback_mapping)

    feedback_mapping_collapsed = {category: code for code, category in enumerate(merged_filtered['feedback_helped_collapsed'].cat.categories)}
    merged_filtered['feedback_helped_collapsed_code'] = merged_filtered['feedback_helped_collapsed'].map(feedback_mapping_collapsed)

    drone_mapping = {category: code for code, category in enumerate(merged_filtered['drone_experience'].cat.categories)}
    merged_filtered['drone_experience_code'] = merged_filtered['drone_experience'].map(drone_mapping)

    game_mapping = {category: code for code, category in enumerate(merged_filtered['video_game_experience'].cat.categories)}
    merged_filtered['video_game_experience_code'] = merged_filtered['video_game_experience'].map(game_mapping)

    condition_mapping = {category: code for code, category in enumerate(merged_filtered['condition'].cat.categories)}
    merged_filtered['condition_code'] = merged_filtered['condition'].map(condition_mapping)
    all_responses['condition_code'] = all_responses['condition'].map(condition_mapping)

    outcome_mapping = {category: code for code, category in enumerate(all_responses['outcome'].cat.categories)}
    all_responses['outcome_code'] = all_responses['outcome'].map(outcome_mapping)

    for q in questions:
        mapping = {category: code for code, category in enumerate(all_responses[f'{q}'].cat.categories)}
        merged_filtered[f'mode_{q}_code'] = merged_filtered[f'mode_{q}'].map(mapping)

    # return ids for each condition
    score_ids = merged_filtered[merged_filtered['condition'] == 'score']['prolific_id']
    text_ids = merged_filtered[merged_filtered['condition'] == 'text']['prolific_id']
    full_ids = merged_filtered[merged_filtered['condition'] == 'full']['prolific_id']
    ids = {'score' : score_ids,
           'text' : text_ids,
           'full' : full_ids}

    # save final data to file, just in case
    filtered_participant_file = data_dir + 'participant_info_filtered.csv'
    merged_filtered.to_csv(filtered_participant_file, index=False)

    survey_file = data_dir + 'survey_responses_combined.csv'
    all_responses.to_csv(survey_file, index=False)

    # print some stats to make sure it processed correctly
    print(f"Final number of IDs in participant file: {len(merged_filtered)}")
    print(f"Final number of IDs in trial file: {len(all_responses['prolific_id'].unique())}")
    
    # return final datasets
    return merged_filtered, all_responses, ids

# copies all images into one folder. run only once
def copy_images(ids):
    # make images folder if it doesn't exist
    if not os.path.exists(data_dir + 'images'):
        os.makedirs(data_dir + 'images')
        os.makedirs(data_dir + 'images/raw')
        os.makedirs(data_dir + 'images/processed')

    # for each participant, save image from each trial
    user_dirs = os.listdir(data_dir)
    for user in ids:
        print(user)
        if user not in user_dirs:
            continue
        for trials in os.listdir(data_dir + user):
            if not os.path.isdir(data_dir + user + '/' + trials):
                continue
            raw_image = data_dir + user + '/' + trials + '/trajectory.png'
            processed_image = data_dir + user + '/' + trials + '/trajectory_with_feedback.png'
            # copy images to images folder
            if not os.path.exists(raw_image) or not os.path.exists(processed_image):
                continue
            shutil.copy(raw_image, data_dir + 'images/raw/' + user + '_' + trials + '_raw.png')
            shutil.copy(processed_image, data_dir + 'images/processed/' + user + '_' + trials + '_processed.png')

# run basic stats for methods section
def run_basic_stats(part_file):
    n_participants = len(part_file)
    count_cols = ['condition', 'gender', 'drone_experience', 'video_game_experience', 'feedback_helped', 'feedback_helped_collapsed']

    for c in count_cols:
        col1 = part_file[c].value_counts().sort_index()
        col2 = (part_file[c].value_counts().sort_index()/n_participants).round(2)
        col2.name = 'proportion'
        print(pd.merge(col1, col2, left_index=True, right_index=True))

    describe_cols = ['age', 'total_time_seconds', 'avg_feedback_time_seconds', 'n_safe_landings']

    for c in describe_cols:
        print(f"\n{c}:")
        print(part_file[c].describe().round(2))

# fits ordered model with specified dependent and independent variables
def run_ordered_model(dep_var, ind_vars, df):
    model = OrderedModel(df[dep_var],
                         df[ind_vars],
                         distr='logit')
    results = model.fit(method='bfgs')
    print(results.summary())

# runs Kruskal-Wallis test to see if distributions are different between groups
def run_kruskal(var, df):
    distribution = df.groupby('condition')[var].value_counts(normalize=True).unstack().round(2).sort_index()
    print(distribution)

    grouped_data = [group for group in df.groupby('condition')[var].apply(list)]
    result = stats.kruskal(*grouped_data)
    print(result)

    if result.pvalue < 0.05:
        # run Dunn's posthoc test to see which groups are different
        print(sp.posthoc_dunn(df, val_col=var, group_col='condition', p_adjust='bonferroni'))

# run one-way anova to see if there are differences between groups (parameterized version of Kruskal-Wallis)
def run_anova(var, df):
    grouped_data = [group for group in df.groupby('condition')[var].apply(list)]
    result = stats.f_oneway(*grouped_data)
    print(result)

    if result.pvalue < 0.05:
        # run Dunn's posthoc test to see which groups are different
        print(sp.posthoc_dunn(df, val_col=var, group_col='condition', p_adjust='bonferroni'))

# runs ttest on variable to see differences in splits of trials
def run_ttest_quantiles(var, splits, part_file, trial_file, idx=None):
    n_trials = 20
    split1 = splits[0] * n_trials
    trials1 = trial_file[trial_file['trial'] <= split1]
    outcomes1 = pd.merge(trials1.groupby('prolific_id')['outcome'].value_counts().unstack(), part_file[['prolific_id', 'condition']], left_index=True, right_on='prolific_id')

    split2 = splits[1] * n_trials
    trials2 = trial_file[trial_file['trial'] > split2]
    outcomes2 = pd.merge(trials2.groupby('prolific_id')['outcome'].value_counts().unstack(), part_file[['prolific_id', 'condition']], left_index=True, right_on='prolific_id')

    if idx is None:
        # do it on all conditions
        result = stats.ttest_ind(outcomes1[var], outcomes2[var])
    else:
        # do it for just condition idx provided
        result = stats.ttest_ind(outcomes1.loc[outcomes1['prolific_id'].isin(idx), var], outcomes2.loc[outcomes2['prolific_id'].isin(idx), var])
    
    print(result)
