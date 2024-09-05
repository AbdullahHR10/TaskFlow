""" Module that contains the Note class. """
from uuid import uuid4
from datetime import datetime
from website import db


class Note(db.Model):
    """ Represents a note in the TaskFlow application. """

    id = db.Column(db.String(36), primary_key=True,
                   default=lambda: str(uuid4()))
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow,
                           onupdate=datetime.utcnow)
    user_id = db.Column(db.String, db.ForeignKey('user.id'))
    user = db.relationship('User', back_populates='notes')