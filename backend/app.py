from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from flask import jsonify
from sqlalchemy import func
from sqlalchemy import text

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@db:5432/dbname'
db = SQLAlchemy(app)


# Models
class ParticipantStatusLog(db.Model):
    __tablename__ = 'participant_status_logs'
    id = Column(Integer, primary_key=True)
    timestamp = Column(DateTime)
    current_location = Column(String)
    participant_id = Column(Integer, ForeignKey('participants.participant_id'))
    current_mode = Column(String)
    hunger_status = Column(String)
    sleep_status = Column(String)
    apartment_id = Column(Integer, ForeignKey('apartments.apartment_id'))
    available_balance = Column(Float)
    job_id = Column(Integer, ForeignKey('jobs.job_id'))
    financial_status = Column(String)
    daily_food_budget = Column(Float)
    weekly_extra_budget = Column(Float)

    participant = relationship("Participant", back_populates="participant_status_logs")
    apartment = relationship("Apartment", back_populates="participant_status_logs")
    job = relationship("Job", back_populates="participant_status_logs")

class Apartment(db.Model):
    __tablename__ = 'apartments'
    apartment_id = Column(Integer, primary_key=True)
    rental_cost = Column(Float)
    max_occupancy = Column(Integer)
    number_of_rooms = Column(Integer)
    location = Column(String)
    building_id = Column(Integer, ForeignKey('buildings.building_id'))

    building = relationship("Building", back_populates="apartments")
    participant_status_logs = relationship("ParticipantStatusLog", back_populates="apartment")

class Building(db.Model):
    __tablename__ = 'buildings'
    building_id = Column(Integer, primary_key=True)
    location = Column(String)
    building_type = Column(String)
    max_occupancy = Column(Integer)

    apartments = relationship("Apartment", back_populates="building")

class Employer(db.Model):
    __tablename__ = 'employers'
    employer_id = Column(Integer, primary_key=True)
    location = Column(String)
    building_id = Column(Integer, ForeignKey('buildings.building_id'))

    building = relationship("Building")

class Job(db.Model):
    __tablename__ = 'jobs'
    job_id = Column(Integer, primary_key=True)
    employer_id = Column(Integer, ForeignKey('employers.employer_id'))
    hourly_rate = Column(Float)
    start_time = Column(DateTime)
    end_time = Column(DateTime)
    days_to_work = Column(String)
    education_requirement = Column(String)

    employer = relationship("Employer")
    participant_status_logs = relationship("ParticipantStatusLog", back_populates="job")

class Participant(db.Model):
    __tablename__ = 'participants'
    participant_id = Column(Integer, primary_key=True)
    household_size = Column(Integer)
    have_kids = Column(Boolean)
    age = Column(Integer)
    education_level = Column(String)
    interest_group = Column(String)
    joviality = Column(Float)

    participant_status_logs = relationship("ParticipantStatusLog", back_populates="participant")

class Pub(db.Model):
    __tablename__ = 'pubs'
    pub_id = Column(Integer, primary_key=True)
    hourly_cost = Column(Float)
    max_occupancy = Column(Integer)
    location = Column(String)
    building_id = Column(Integer, ForeignKey('buildings.building_id'))

    building = relationship("Building")

class Restaurant(db.Model):
    __tablename__ = 'restaurants'
    restaurant_id = Column(Integer, primary_key=True)
    food_cost = Column(Float)
    max_occupancy = Column(Integer)
    location = Column(String)
    building_id = Column(Integer, ForeignKey('buildings.building_id'))

    building = relationship("Building")

class School(db.Model):
    __tablename__ = 'schools'
    school_id = Column(Integer, primary_key=True)
    monthly_cost = Column(Float)
    max_enrollment = Column(Integer)
    location = Column(String)
    building_id = Column(Integer, ForeignKey('buildings.building_id'))

    building = relationship("Building")

class CheckinJournal(db.Model):
    __tablename__ = 'checkin_journals'
    id = Column(Integer, primary_key=True)
    participant_id = Column(Integer, ForeignKey('participants.participant_id'))
    timestamp = Column(DateTime)
    venue_id = Column(Integer)
    venue_type = Column(String)

    participant = relationship("Participant")

class FinancialJournal(db.Model):
    __tablename__ = 'financial_journals'
    id = Column(Integer, primary_key=True)
    participant_id = Column(Integer, ForeignKey('participants.participant_id'))
    timestamp = Column(DateTime)
    category = Column(String)
    amount = Column(Float)

    participant = relationship("Participant")

class SocialNetwork(db.Model):
    __tablename__ = 'social_networks'
    id = Column(Integer, primary_key=True)
    timestamp = Column(DateTime)
    participant_id_from = Column(Integer, ForeignKey('participants.participant_id'))
    participant_id_to = Column(Integer, ForeignKey('participants.participant_id'))

    participant_from = relationship("Participant", foreign_keys=[participant_id_from])
    participant_to = relationship("Participant", foreign_keys=[participant_id_to])

class TravelJournal(db.Model):
    __tablename__ = 'travel_journals'
    id = Column(Integer, primary_key=True)
    participant_id = Column(Integer, ForeignKey('participants.participant_id'))
    travel_start_time = Column(DateTime)
    travel_start_location_id = Column(Integer)
    travel_end_time = Column(DateTime)
    travel_end_location_id = Column(Integer)
    purpose = Column(String)
    check_in_time = Column(DateTime)
    check_out_time = Column(DateTime)
    starting_balance = Column(Float)
    ending_balance = Column(Float)

    participant = relationship("Participant")


@app.route('/test_db')
def test_db():
    try:
        # Replace 'YourModel' with an actual model from your application
        result = TravelJournal.query.first()
        return f"Database connection successful. First record: {result}"
    except Exception as e:
        return f"Error connecting to the database: {e}"
    
def participant_status_log_to_dict(log):
    return {
        "id": log.id,
        "timestamp": log.timestamp.isoformat(),
        "current_location": log.current_location,
        "participant_id": log.participant_id,
        "current_mode": log.current_mode,
        "hunger_status": log.hunger_status,
        "sleep_status": log.sleep_status,
        "apartment_id": log.apartment_id,
        "available_balance": log.available_balance,
        "job_id": log.job_id,
        "financial_status": log.financial_status,
        "daily_food_budget": log.daily_food_budget,
        "weekly_extra_budget": log.weekly_extra_budget,
    }

@app.route('/moving-bubble-chart')
def moving_bubble_chart():
    min_date = request.args.get('min_date', '2022-10-25')
    logs = db.session.query(ParticipantStatusLog).from_statement(text("""
    SELECT *
    FROM participant_status_logs_small
    WHERE participant_id BETWEEN 0 AND 99
    AND DATE(timestamp) = CAST(:min_date AS DATE)
    """)).params(min_date=min_date).all()

    logs_dict = [participant_status_log_to_dict(log) for log in logs]
    response = {"message": "Data retrieved successfully", "data": logs_dict}
    return jsonify(response)
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4000, debug=True)