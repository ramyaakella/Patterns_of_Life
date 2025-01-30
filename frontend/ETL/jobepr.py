import pandas as pd


jobs_df = pd.read_csv('/Users/aayushsharma/Downloads/VAST-Challenge-2022/Datasets/Attributes/Jobs.csv')
participants_df = pd.read_csv('/Users/aayushsharma/Downloads/VAST-Challenge-2022/Datasets/Attributes/Participants.csv')


jobs_df['startTime'] = pd.to_datetime(jobs_df['startTime'])
jobs_df['endTime'] = pd.to_datetime(jobs_df['endTime'])


timeline = pd.date_range(start=jobs_df['startTime'].min(), end=jobs_df['endTime'].max(), freq='H')  # Hourly frequency

job_availability_counts = []


for time_point in timeline:

    count = jobs_df[(jobs_df['startTime'] <= time_point) & (jobs_df['endTime'] >= time_point)].shape[0]
    job_availability_counts.append(count)


total_participants = participants_df.shape[0]


employment_rate = [count / total_participants for count in job_availability_counts]

final_data = pd.DataFrame({
    'Time': timeline,
    'EmploymentRate': employment_rate
})


output_csv_path = '/Users/aayushsharma/Desktop/DV Project/ETL/jobline.csv' 
final_data.to_csv(output_csv_path, index=False)

print(f"Data saved to {output_csv_path}")
