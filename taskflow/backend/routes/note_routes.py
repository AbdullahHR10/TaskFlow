"""Module that contains Note routes.

This module defines API endpoints for:
- Listing user notes
- Creating new notes
- Editing and deleting notes

All routes require authentication, and most require ownership validation.
"""


from flask import Blueprint, request
from flask_login import current_user, login_required
from backend import limiter
from ..models.note import Note
from ..utils.db_helpers import build_object, edit_object
from ..utils.response import json_response
from ..utils.logger import logger
from flasgger import swag_from
from ..utils.doc_path import doc_path
from ..schemas.note_schema import NoteSchema
from ..decorators.ownership import ownership_required


note_bp = Blueprint('note_bp', __name__)
note_schema = NoteSchema()
NOTE_KEYS = ["title", "content", "background_color"]


@note_bp.route("/", methods=["GET"])
@swag_from(doc_path("note/get_notes.yml"))
@limiter.limit("120 per minute")
@login_required
def get_notes():
    """Gets paginated notes for the current user."""
    page = request.args.get("page", 1, type=int)
    per_page = request.args.get("per_page", 12, type=int)
    pagination = Note.query.filter_by(user_id=current_user.id) \
        .order_by(Note.updated_at.desc()) \
        .paginate(page=page, per_page=per_page, error_out=False)

    return json_response(
        status="success",
        data={
            "notes": [note.to_dict() for note in pagination.items],
            "total": pagination.total,
            "pages": pagination.pages,
            "current_page": pagination.page,
            "per_page": pagination.per_page
        }
    ), 200


@note_bp.route("/", methods=["POST"])
@swag_from(doc_path("note/create_note.yml"))
@limiter.limit("10 per minute")
@login_required
def create_note():
    """Creates a new note."""
    new_note = build_object(Note, NOTE_KEYS, schema=note_schema)
    new_note.save(refresh=True)
    logger.info(f"User {current_user.id} created note {new_note.id}")

    return json_response(
        status="success",
        message="Note created successfully",
        data=new_note.to_dict()
    ), 201


@note_bp.route("/<string:note_id>", methods=["PATCH"])
@swag_from(doc_path("note/edit_note.yml"))
@limiter.limit("10 per minute")
@login_required
@ownership_required(Note)
def edit_note(note):
    """Edits a note."""
    edit_object(note, NOTE_KEYS, schema=note_schema)
    note.save(refresh=True)
    logger.info(f"User {current_user.id} edited note {note.id}")

    return json_response(
        status="success",
        message="Note updated successfully",
        data=note.to_dict()
    ), 200


@note_bp.route("/<string:note_id>", methods=["DELETE"])
@swag_from(doc_path("note/delete_note.yml"))
@limiter.limit("20 per minute")
@login_required
@ownership_required(Note)
def delete_note(note):
    """Deletes a note."""
    note.delete()
    logger.info(f"User {current_user.id} deleted note {note.id}")

    return json_response(
        status="success",
        message="Note deleted successfully"
    ), 200
