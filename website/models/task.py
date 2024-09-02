""" Module that contains the Task class. """
from uuid import uuid4
from datetime import datetime
from website import db


class Task(db.Model):
    """ Represents a task in the TaskFlow application. """

    id = db.Column(db.String(36), primary_key=True,
                   default=lambda: str(uuid4()))
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    due_date = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.String(20), default="pending")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow,
                           onupdate=datetime.utcnow)
    user_id = db.Column(db.String, db.ForeignKey('user.id'))