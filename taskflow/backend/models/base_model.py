"""Module that contains BaseModel."""
from backend import Base, db
from sqlalchemy import Column, String, DateTime
from uuid import uuid4
from datetime import datetime, date, timezone
from enum import Enum
from ..utils.logger import logger
from typing import Self


class BaseModel(Base, db.Model):
    """Defines all common attributes and methods for all the other classes."""
    __abstract__ = True

    id = Column(String(36), nullable=False, primary_key=True,
                default=lambda: str(uuid4()))
    created_at = Column(DateTime, nullable=False,
                        default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, nullable=False,
                        default=lambda: datetime.now(timezone.utc))

    def __init__(self, **kwargs: object) -> None:
        """
        Creates an instance of a class.

        Args:
            **kwargs (dict): Keyword arguments
        """
        self.id = str(uuid4())
        self.created_at = datetime.now(timezone.utc)
        self.updated_at = self.created_at

        if kwargs:
            for key, value in kwargs.items():
                if key != "__class__":
                    setattr(self, key, value)

    def save(self, refresh: bool = False) -> Self:
        """Saves the object to the database."""
        self.updated_at = datetime.now(timezone.utc)
        try:
            db.session.add(self)
            db.session.commit()
            if refresh:
                db.session.refresh(self)
            return self
        except Exception as e:
            db.session.rollback()
            logger.error(f"[{self.__class__.__name__}] Save failed: "
                         f"{str(e.orig) if hasattr(e, 'orig') else e}")
            logger.debug(f"Full SQL Error: {e}")
            raise

    def delete(self) -> None:
        """Deletes the object from the database."""
        try:
            db.session.delete(self)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            logger.error(f"[{self.__class__.__name__}] Delete failed: "
                         f"{str(e.orig) if hasattr(e, 'orig') else e}")
            logger.debug(f"Full SQL Error: {e}")
            raise

    def to_dict(self) -> dict:
        """Returns a dict with object attributes."""
        dict_rep = {}
        for key, value in self.__dict__.items():
            if not key.startswith("_") and key != "password":
                if isinstance(value, datetime):
                    value = value.strftime('%Y-%m-%d %H:%M:%S')
                elif isinstance(value, date):
                    value = value.strftime('%Y-%m-%d')
                elif isinstance(value, Enum):
                    value = value.value
                dict_rep[key] = value
        return dict_rep

    def __str__(self) -> str:
        """Returns a string representation of the object."""
        dict_rep = self.to_dict()
        return f"[{self.__class__.__name__}] ({self.id}) {dict_rep}"
