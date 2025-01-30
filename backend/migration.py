import os
import pandas as pd
from sqlalchemy import create_engine
from app import app, db, ParticipantStatusLog, Apartment, Building, Employer, Job, Participant, Pub, Restaurant, School, CheckinJournal, FinancialJournal, SocialNetwork, TravelJournal
import re

def camel_to_snake_case(name):
    s1 = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', name)
    return re.sub('([a-z0-9])([A-Z])', r'\1_\2', s1).lower()


with app.app_context():
    db.create_all()

engine = create_engine('postgresql://username:password@localhost:5432/dbname')

def load_csv_data(file_path, model, columns, index_col=None, time_columns=None, datetime_columns=None):
    parse_dates = []
    if time_columns:
        parse_dates += time_columns
    if datetime_columns:
        parse_dates += datetime_columns

    df = pd.read_csv(file_path, parse_dates=parse_dates)

    if time_columns:
        for col in time_columns:
            # snake_case_col = camel_to_snake_case(col).strip()
            if col in df.columns:
                df[col] = pd.to_datetime(df[col].astype(str))

    df.columns = [camel_to_snake_case(col).strip() for col in df.columns]
    df[columns].to_sql(model.__tablename__, engine, if_exists='append', index=False)

base_path = './VAST-Challenge-2022/VAST-Challenge-2022/Datasets'
# Load data from CSV files into the database
# ==============================================
print()
print("==================================== Starting Attributes migration ====================================")
print()
load_csv_data(base_path + '/Attributes/Buildings.csv', Building, [
    'building_id', 'location', 'building_type', 'max_occupancy'
], index_col='building_id')

load_csv_data(base_path + '/Attributes/Apartments.csv', Apartment, [
    'apartment_id', 'rental_cost', 'max_occupancy', 'number_of_rooms', 'location', 'building_id'
], index_col='apartment_id')

load_csv_data(base_path + '/Attributes/Employers.csv', Employer, [
    'employer_id', 'location', 'building_id'
], index_col='employer_id')

load_csv_data(base_path + '/Attributes/Jobs.csv', Job, [
    'job_id', 'employer_id', 'hourly_rate', 'start_time', 'end_time', 'days_to_work', 'education_requirement'
], index_col='job_id', time_columns=['startTime', 'endTime'])

load_csv_data(base_path + '/Attributes/Participants.csv', Participant, [
    'participant_id', 'household_size', 'have_kids', 'age', 'education_level', 'interest_group', 'joviality'
], index_col='participant_id')

load_csv_data(base_path + '/Attributes/Pubs.csv', Pub, [
    'pub_id', 'hourly_cost', 'max_occupancy', 'location', 'building_id'
], index_col='pub_id')

load_csv_data(base_path + '/Attributes/Restaurants.csv', Restaurant, [
    'restaurant_id', 'food_cost', 'max_occupancy', 'location', 'building_id'
], index_col='restaurant_id')

load_csv_data(base_path + '/Attributes/Schools.csv', School, [
    'school_id', 'monthly_cost', 'max_enrollment', 'location', 'building_id'
], index_col='school_id')
print()
print("==================================== Done with Attributes migration ====================================")
print()
print("==================================== Starting Journal migration ====================================")
print()
load_csv_data(base_path + '/Journals/CheckinJournal.csv', CheckinJournal, [
    'participant_id', 'timestamp', 'venue_id', 'venue_type'
], datetime_columns=['timestamp'])
print()
print("************************************ Done with Check in Journal migration: ************************************")
print()
load_csv_data(base_path + '/Journals/FinancialJournal.csv', FinancialJournal, [
    'participant_id', 'timestamp', 'category', 'amount'
], datetime_columns=['timestamp'])
print()
print("************************************ Done with Financial Journal migration: ************************************")
print()
load_csv_data(base_path + '/Journals/SocialNetwork.csv', SocialNetwork, [
    'timestamp', 'participant_id_from', 'participant_id_to'
], datetime_columns=['timestamp'])
print()
print("************************************ Done with Social Network Journal migration: ************************************")
print()
# ====================================================================
load_csv_data(base_path + '/Journals/TravelJournal.csv', TravelJournal, [
    'participant_id', 'travel_start_time', 'travel_start_location_id', 'travel_end_time',
    'travel_end_location_id', 'purpose', 'check_in_time', 'check_out_time',
    'starting_balance', 'ending_balance'
], time_columns=['travelStartTime', 'travelEndTime', 'checkInTime', 'checkOutTime'])
print()
print("************************************ Done with Travel Journal migration: ************************************")
print()
print("==================================== Done with Journal migration ====================================")
print()
print("==================================== Starting Activity Logs migration ====================================")
print()
activity_logs_path = os.path.join(base_path, 'Activity Logs')
csv_files = [f for f in os.listdir(activity_logs_path) if f.endswith('.csv')]
i = 1
for csv_file in csv_files:
    file_path = os.path.join(activity_logs_path, csv_file)
    load_csv_data(file_path, ParticipantStatusLog, [
        'timestamp', 'current_location', 'participant_id', 'current_mode', 'hunger_status', 'sleep_status',
        'apartment_id', 'available_balance', 'job_id', 'financial_status', 'daily_food_budget', 'weekly_extra_budget'
    ], datetime_columns=['timestamp'])
    print("************************************ Done with Activity log: ", i, " migration ************************************")
    i += 1
print()
print("==================================== End of migration ====================================")
print()