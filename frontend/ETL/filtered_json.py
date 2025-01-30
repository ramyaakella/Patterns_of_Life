import json

input_json_file_path = "/Users/aayushsharma/Downloads/VAST-Challenge-2022/Datasets/merged_logs1.json"
output_json_file_path = "/Users/aayushsharma/Downloads/VAST-Challenge-2022/Datasets/filtered_logs1.json"

with open(input_json_file_path, 'r') as file:
    json_data = json.load(file)

filtered_data = [{"participantId": entry["participantId"], "timestamp": entry["timestamp"], "currentMode": entry["currentMode"]} for entry in json_data]

filtered_json = json.dumps(filtered_data, indent=2)

with open(output_json_file_path, 'w') as output_file:
    output_file.write(filtered_json)

print(f"Filtered JSON data has been stored in {output_json_file_path}.")
