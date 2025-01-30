import pandas as pd

# Load dataset
df = pd.read_csv('/Users/aayushsharma/Downloads/VAST-Challenge-2022/Datasets/Journals/CheckinJournal.csv')

# Convert timestamp to datetime
df['timestamp'] = pd.to_datetime(df['timestamp'])

# Set timestamp as index
df.set_index('timestamp', inplace=True)

# Resample and count check-ins by venue type over time
# Adjust 'H' to 'D' for daily, etc., as needed
venue_type_counts = df.groupby('venueType').resample('H').size().unstack(level=0)

# Reset the index to turn the datetime back into a column
venue_type_counts.reset_index(inplace=True)

# Save the processed data to a new CSV file
output_csv_path = '/Users/aayushsharma/Desktop/DV Project/ETL/checkindata.csv'  # Replace with your desired output file path
venue_type_counts.to_csv(output_csv_path, index=False)

print(f"Processed data saved to {output_csv_path}")
