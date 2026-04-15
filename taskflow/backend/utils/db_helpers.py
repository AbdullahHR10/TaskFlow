"""Module that contains database helpers."""
from flask import abort, request
from flask_login import current_user
from backend import db
from backend.models import Task, Habit, Budget, Transaction, Note
import bleach
from marshmallow import Schema


def check_model(model: type):
    """Checks if the model is available."""
    Models = [Task, Habit, Budget, Transaction, Note]
    if model not in Models:
        abort(404, "This model is unavailable.")


def sanitize_input(data: dict, keys: list[str]) -> dict:
    """
    Sanitizes input fields using bleach.

    Args:
        data (dict): data containing potentially unsafe user data.
        keys (list[str]): The list that will be sanitized.

    Returns:
        Dictionary with the specified keys sanitized.
    """
    sanitized = {}
    for key in keys:
        value = data.get(key)
        if isinstance(value, str):
            sanitized[key] = bleach.clean(value)
        else:
            sanitized[key] = value

    return sanitized


def get_object(model: type, obj_id: str) -> object:
    """
    Retrieves an object by ID and ensures it belongs to the current user.

    Args:
        model (type): The model class to query.
        obj_id (str): The ID of the object to retrieve.

    Returns:
        object: The authorized object instance.
    """
    check_model(model)
    obj = db.session.get(model, obj_id)

    if not obj or obj.user_id != current_user.id:
        abort(404, "object not found or unauthorized")

    return obj


def build_object(
    model: type,
    keys: list[str],
    schema: Schema = None,
    data: dict = None,
    user_id: str = None
) -> object:
    """
    Builds an instance of the given model using JSON data from the request.

    Args:
        model (type): The model class to instantiate.
        keys (list[str]): List of keys to extract from the JSON payload.
        schema (Schema): The schema to test the data with.
        data (dict): The data to build the object with.
        user_id (str): The user's id.

    Returns:
        An instance of `model` with the extracted data and user id.
    """
    check_model(model)
    if data is None:
        data = request.get_json()

    if schema:
        from marshmallow import ValidationError
        try:
            obj_data = schema.load(data)
        except ValidationError as e:
            abort(400, description={
                "status": "error",
                "message": "Validation failed",
                "data": e.messages
            })
    else:
        obj_data = {key: data.get(key) for key in keys}

    obj_data = sanitize_input(obj_data, keys)
    obj_data["user_id"] = user_id or current_user.id
    return model(**obj_data)


def edit_object(
    obj: object,
    keys: list[str],
    schema: Schema = None,
    data: dict = None
) -> object:
    """
    Updates the provided object's attributes using JSON data from the request.

    Args:
        obj (object): The SQLAlchemy model instance to be edited.
        keys (list[str]): List of keys to extract from the JSON payload.
        schema (Schema): The schema to test the data with.
        data (dict): The data to build the object with.
    Returns:
        object: The updated object instance with modified fields.
    """
    if data is None:
        data = request.get_json()

    if schema:
        from marshmallow import ValidationError
        try:
            data = schema.load(data, partial=True)
        except ValidationError as e:
            abort(400, {"status": "error",
                        "message": "Validation failed", "data": e.messages})

    data = sanitize_input(data, keys)

    if hasattr(obj, "completed") and obj.completed:
        abort(400, {
            "status": "error",
            "message": "can't edit a completed instance"
        })

    for key, value in data.items():
        if hasattr(obj, key):
            setattr(obj, key, value)

    return obj
