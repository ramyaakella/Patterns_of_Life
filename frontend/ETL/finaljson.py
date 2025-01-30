import json

# Specify the path to your timestamp_data.json file
json_file_path = "./data/cleaned/new_json.json"

# Load JSON data from the file
with open(json_file_path, 'r') as file:
    data_list = json.load(file)

# print(data_list)
result_dict = {}

time_spent = 0
mode = ""
participant_id = None   
# Process the data to create the desired format
for entry in data_list:

    if participant_id != None and participant_id == entry["participantId"] and mode != entry["currentMode"]:
        if participant_id not in result_dict:
            result_dict[participant_id] = ""
        result_dict[participant_id] += f"{mode},{time_spent},"
        time_spent = 0

    participant_id = entry["participantId"]
    mode = entry["currentMode"]
    time_spent = +entry["minutes_from_midnight"]

    # If participant_id is not in result_dict, initialize an empty string

    # Append mode and time_spent to the existing string for the participant
    

if participant_id not in result_dict:
    result_dict[participant_id] = ""
result_dict[participant_id] += f"{mode},{time_spent},"
# Convert the result_dict to the final JSON format
final_json = [{str(k): v.rstrip(',')} for k, v in result_dict.items()]

# Print the final JSON
print(json.dumps(final_json, indent=2))
# Initialize a dictionary to store participant data
# participant_data = {}
with open("./data/cleaned/result_data.json", 'w') as result_file:
    json.dump(final_json, result_file, indent=2)

