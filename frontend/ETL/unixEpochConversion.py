import json
from datetime import datetime, timezone

json_file_path = "/Users/aayushsharma/Downloads/VAST-Challenge-2022/Datasets/filtered_logs1.json"
output_json_file_path = "/Users/aayushsharma/Downloads/VAST-Challenge-2022/Datasets/new1_json.json"

# Load JSON data from the file
with open(json_file_path, 'r') as file:
    data_list = json.load(file)

for timestamp_data in data_list:
    # Extract the timestamp from the loaded data
    timestamp = timestamp_data.get("timestamp", 0)

    # Convert Unix epoch timestamp to datetime object
    dt_object = datetime.utcfromtimestamp(timestamp / 1000.0).replace(tzinfo=timezone.utc)

    # Calculate minutes from 12 am
    minutes_from_midnight = (dt_object - dt_object.replace(hour=0, minute=0, second=0, microsecond=0)).total_seconds() / 60

    # Update the timestamp_data with the calculated minutes
    timestamp_data["minutes_from_midnight"] = int(minutes_from_midnight)

with open(output_json_file_path, 'w') as file:
    json.dump(data_list, file, indent=2)

    print("Minutes from 12 am:", int(minutes_from_midnight))
    print(f"Updated JSON data has been stored in {output_json_file_path}.")