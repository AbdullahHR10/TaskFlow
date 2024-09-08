""" Module that contains the Budget class. """
from uuid import uuid4
from datetime import datetime
from website import db


class Budget(db.Model):
    """ Represents a budget in the TaskFlow application. """

    id = db.Column(db.String(36), primary_key=True,
                   default=lambda: str(uuid4()))
    item = db.Column(db.String)
    has_purchase = db.Column(db.Boolean, default=False)
    has_sale = db.Column(db.Boolean, default=False)
    transactions = db.Column(db.JSON)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow,
                           onupdate=datetime.utcnow)
    user_id = db.Column(db.String, db.ForeignKey('user.id'))