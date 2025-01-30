import pandas as pd
from datetime import datetime
import json
import os

# Get the current working directory
current_dir = os.getcwd()

# Define the relative folder path
folder_path = os.path.join(current_dir, "VAST-Challenge-2022", "VAST-Challenge-2022", "Datasets")

participants_df = pd.read_csv(os.path.join(folder_path, 'Attributes', 'Participants.csv'), delimiter=',')
logs_df = pd.read_csv(os.path.join(folder_path, 'Activity Logs', 'ParticipantStatusLogs57.csv'), delimiter=',')

logs_df = logs_df[['timestamp', 'participantId', 'currentMode']]

first_timestamp = logs_df['timestamp'].iloc[0]
print("First timestamp:", first_timestamp)

logs_df['timestamp'] = pd.to_datetime(logs_df['timestamp'])
logs_df = logs_df[logs_df['timestamp'].dt.date == datetime(2023, 2, 17).date()]
# participants_df = participants_df[participants_df['participantId']]
merged_df = pd.merge(participants_df, logs_df, on='participantId')

print("Number of rows being inserted into JSON:", len(merged_df))

# unique_participant_ids_logs = logs_df['participantId'].unique()
# print("Unique participant IDs from participant status logs:", unique_participant_ids_logs)

# Determine which participant IDs from the participants table are missing in the participant logs
# missing_participant_ids = participants_df[~participants_df['participantId'].isin(unique_participant_ids_logs)]['participantId']
# print("Missing participant IDs from participant status logs:", missing_participant_ids.values)

merged_df.to_json('merged_logs1.json', orient='records')