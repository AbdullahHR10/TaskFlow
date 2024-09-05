""" Module that contains the Habit class. """
from uuid import uuid4
from datetime import datetime
from website import db


class Habit(db.Model):
    """ Represents a habit in the TaskFlow application. """

    id = db.Column(db.String(36), primary_key=True,
                   default=lambda: str(uuid4()))
    name = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(50))
    description = db.Column(db.Text)
    frequency = db.Column(db.String(50), nullable=False)
    streak = db.Column(db.Integer, default=0)
    habit_time = db.Column(db.DateTime)
    status = db.Column(db.String(20), default="active")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow,
                           onupdate=datetime.utcnow)
    user_id = db.Column(db.String, db.ForeignKey('user.id'))