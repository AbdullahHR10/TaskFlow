""" Module that contains the User class. """
from uuid import uuid4
from flask_login import UserMixin
from website import db
from sqlalchemy.orm import relationship


class User(db.Model, UserMixin):
    """ Represents a user in the TaskFlow application. """
    id = db.Column(db.String(36), primary_key=True,
                   default=lambda: str(uuid4()))
    username = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    tasks = db.relationship('Task')
    habits = db.relationship('Habit')
    budget = db.relationship('Budget')
    notes = db.relationship('Note')