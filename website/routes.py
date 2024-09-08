""" Define routes for the Flask application. """
from flask import Blueprint, render_template, redirect, url_for, request
from flask import flash, jsonify
import smtplib
from flask_login import login_required, current_user
from .models.task import Task
from .models.habit import Habit
from .models.budget import Budget
from .models.note import Note
from website import db
from datetime import datetime

routes = Blueprint('routes', __name__)


@routes.route('/')
def index():
    """ Render the landing page for logged-in users
    or redirect to home page for others."""
    if current_user.is_authenticated:
        return render_template("home.html", user=current_user)
    else:
        return redirect(url_for('routes.welcome'))


@routes.route('/home', methods=['GET', 'POST'])
@login_required
def home():
    """ Renders the home page. """
    return render_template('home.html')


@routes.route('/welcome')
def welcome():
    """ Renders the landing page. """
    return render_template('landing_page.html')


@routes.route('/to_do_list', methods=['GET', 'POST'])
@login_required
def to_do_list():
    """ Returns to do list page. """
    return render_template('to_do_list.html')


@routes.route('/habit_tracker')
@login_required
def habit_tracker():
    """ Returns habit tracker page. """
    return render_template('habit_tracker.html')


@routes.route('/budget_tracker', methods=['GET', 'POST'])
@login_required
def budget_tracker():
    """ Returns budget tracker page. """
    return render_template('budget_tracker.html')


@routes.route('/notes')
def notes():
    """ Returns notes page. """
    return render_template('notes.html')


""" Tasks list section. """


@routes.route('/add-task', methods=['GET', 'POST'])
@login_required
def add_task():
    """ Adds a task in tasks list. """
    if request.method == 'POST':
        task_title = request.form.get('task_title')
        task_description = request.form.get('task_description')
        due_date_str = request.form.get('due_datetime')

        if not task_title or not task_description or not due_date_str:
            flash('All fields are required.', 'error')
            return redirect(url_for('routes.to_do_list'))

        try:
            due_date = datetime.strptime(due_date_str,
                                         '%Y-%m-%dT%H:%M')
        except ValueError:
            flash('Invalid date format. Please use YYYY-MM-DDTHH:MM.',
                  'error')
            return redirect(url_for('routes.to_do_list'))

        if len(task_description) > 120:
            flash('Task description must be 120 characters or less',
                  'error')
            return redirect(url_for('routes.to_do_list'))

        due_date = datetime.strptime(due_date_str, '%Y-%m-%dT%H:%M')
        user_id = current_user.get_id()
        new_task = Task(title=task_title,
                        description=task_description,
                        due_date=due_date,
                        user_id=user_id,
                        status="pending"
                        )
        db.session.add(new_task)
        db.session.commit()
        return redirect(url_for('routes.to_do_list'))


@routes.route('/edit-task', methods=['GET', 'POST'])
@login_required
def edit_task():
    """ Edits a task from tasks list. """
    task_id = request.form.get('task_id')
    task = Task.query.filter_by(id=task_id, user_id=current_user.id).first()

    if not task:
        flash("Task not found.", "error")
        return redirect(url_for('routes.to_do_list'))

    if request.method == 'POST':
        task.title = request.form.get('title')
        task.description = request.form.get('description')
        due_date_str = request.form.get('due_datetime')
        if due_date_str:
            try:
                task.due_date = datetime.fromisoformat(due_date_str)
            except ValueError:
                flash("Invalid date format.", "error")
                return redirect(url_for('routes.to_do_list'))
        db.session.commit()
        flash("Task updated successfully!", "success")
        return redirect(url_for('routes.to_do_list'))

    return render_template('edit_to_do_list.html', task=task)


@routes.route('/delete-task', methods=['GET', 'POST'])
@login_required
def delete_task():
    """ Deletes a task from tasks list. """
    if request.method == 'POST':
        task_id = request.form.get('task_id')

    task = Task.query.get(task_id)
    if task.user_id != current_user.get_id():
        flash('You do not have permission to delete this task.', 'error')
        return redirect(url_for('to_do_list.home'))

    db.session.delete(task)
    db.session.commit()
    flash('Task deleted successfully.', 'success')
    return redirect(url_for('routes.to_do_list'))


@routes.route('/toggle_task_status', methods=['POST'])
@login_required
def toggle_task_status():
    """ Toggles the status of a task between completed and pending. """
    task_id = request.form.get('task_id')
    task = Task.query.get(task_id)

    if task and task.user_id == current_user.get_id():
        if task.status == 'completed':
            task.status = 'pending'
            flash('Task marked as pending.', 'success')
        else:
            task.status = 'completed'
            flash('Task marked as completed.', 'success')
        db.session.commit()
    else:
        flash('Task not found or unauthorized.', 'error')

    return redirect(url_for('routes.to_do_list'))


@routes.route('/mark_tasks_complete', methods=['GET', 'POST'])
@login_required
def mark_tasks_complete():
    """ Marks all tasks as complete for the current user. """
    user_id = current_user.get_id()

    pending_tasks = Task.query.filter_by(user_id=user_id,
                                         status='pending').all()

    if not pending_tasks:
        flash('No pending tasks to complete.', 'error')
    else:
        for task in pending_tasks:
            task.status = 'completed'

        db.session.commit()
        flash(f'All tasks have been marked as completed successfully.',
              'success')

    return redirect(url_for('routes.to_do_list'))


@routes.route('/delete-completed-tasks', methods=['GET', 'POST'])
@login_required
def delete_completed_tasks():
    """ Deletes all completed tasks from tasks list. """
    user_id = current_user.get_id()

    completed_tasks = Task.query.filter_by(user_id=user_id,
                                           status='completed').all()

    for task in completed_tasks:
        db.session.delete(task)

    db.session.commit()
    flash('Completed tasks have been deleted', 'success')
    return redirect(url_for('routes.to_do_list'))


@routes.route('/delete-all-tasks', methods=['GET', 'POST'])
@login_required
def delete_all_tasks():
    """ Deletes all tasks from tasks list. """
    user_id = current_user.get_id()

    tasks = Task.query.filter_by(user_id=user_id).all()

    if not tasks:
        flash('No tasks found to delete.', 'error')
        return redirect(url_for('routes.to_do_list'))

    for tsk in tasks:
        db.session.delete(tsk)

    db.session.commit()
    flash('All tasks have been deleted successfully.', 'success')
    return redirect(url_for('routes.to_do_list'))


""" Habit tracker section. """


@routes.route('/add-habit', methods=['GET', 'POST'])
@login_required
def add_habit():
    """ Adds a habit in tasks list. """
    if request.method == 'POST':
        habit_name = request.form.get('habit_name')
        habit_category = request.form.get('habit_category')
        habit_description = request.form.get('habit_description')
        habit_frequency = request.form.get('habit_frequency')

        if (not habit_name or
                not habit_category or
                not habit_description or
                not habit_frequency):
            flash('All fields are required.', 'error')
            return redirect(url_for('routes.habit_tracker'))

        if len(habit_description) > 120:
            flash('Task description must be 120 characters or less',
                  'error')
            return redirect(url_for('routes.habit_tracker'))

        habit = Habit(name=habit_name,
                      category=habit_category,
                      description=habit_description,
                      frequency=habit_frequency,
                      user_id=current_user.id
                      )

        db.session.add(habit)
        db.session.commit()
        flash('Habit added successfully!', 'success')
        return redirect(url_for('routes.habit_tracker'))

    return render_template('habit_tracker.html')


@routes.route('/edit-habit', methods=['GET', 'POST'])
@login_required
def edit_habit():
    """ Edits a habit from the habit tracker. """
    habit_id = request.form.get('habit_id')
    habit = Habit.query.filter_by(id=habit_id, user_id=current_user.id).first()

    if not habit:
        flash("Habit not found.", "error")
        return redirect(url_for('routes.habit_tracker'))

    if request.method == 'POST':
        habit.name = request.form.get('habit_name')
        habit.category = request.form.get('habit_category')
        habit.description = request.form.get('habit_description')
        habit.frequency = request.form.get('habit_frequency')

        db.session.commit()
        flash("Habit updated successfully!", "success")
        return redirect(url_for('routes.habit_tracker'))

    return render_template('edit_habit.html', habit=habit)


@routes.route('/delete-habit', methods=['GET', 'POST'])
@login_required
def delete_habit():
    """ Deletes a habit from the habit tracker. """
    habit_id = request.form.get('habit_id')
    habit = Habit.query.get(habit_id)

    if not habit or habit.user_id != current_user.id:
        flash('Habit not found or unauthorized.', 'error')
        return redirect(url_for('routes.habit_tracker'))

    db.session.delete(habit)
    db.session.commit()
    flash('Habit deleted successfully!', 'success')
    return redirect(url_for('routes.habit_tracker'))


@routes.route('/complete-habit', methods=['GET', 'POST'])
def complete_habit():
    """ Completes a habit from the habit tracker. """
    habit_id = request.form.get('habit_id')
    habit = Habit.query.filter_by(id=habit_id,
                                  user_id=current_user.id).first()

    if habit:
        habit.streak += 1
        db.session.commit()
        flash('Habit streak increased!', 'success')
        return redirect(url_for('routes.habit_tracker'))

    flash('Habit not found.', 'error')
    return redirect(url_for('routes.habit_tracker'))


@routes.route('/reset-habit-streak', methods=['GET', 'POST'])
def reset_habit_streak():
    """ Resets the habit streak. """
    habit_id = request.form.get('habit_id')
    habit = Habit.query.filter_by(id=habit_id,
                                  user_id=current_user.id).first()

    if habit:
        habit.streak = 0
        db.session.commit()
        flash('Habit streak has been reset.', 'success')
        return redirect(url_for('routes.habit_tracker'))

    flash('Habit not found.', 'error')
    return redirect(url_for('routes.habit_tracker'))


""" Budget section. """


@routes.route('/add_budget', methods=['GET', 'POST'])
@login_required
def add_budget():
    """ Updates the user's balance and adds transactions to their budget. """
    user = current_user

    if request.method == 'POST':
        item = request.form.get('item')
        gained = request.form.get('gained')
        spent = request.form.get('spent')
        is_purchase = request.form.get('is_purchase')
        is_sale = request.form.get('is_sale')

        gained = float(gained) if gained else 0.0
        spent = float(spent) if spent else 0.0

        user.balance += (gained - spent)
        db.session.commit()

        new_transaction = Budget(
            transactions={
                          'item': item,
                          'gained': gained,
                          'spent': spent,
                          'is_sale': is_sale,
                          'is_purchase': is_purchase},
            user_id=user.id
        )
        db.session.add(new_transaction)
        db.session.commit()
        print(request.form)

        flash('Budget updated successfully!', 'success')
        return redirect(url_for('routes.budget_tracker'))
    else:
        flash('Please fill in both gained and spent amounts.', 'danger')

    return redirect(url_for('routes.budget_tracker'))


@routes.route('/update_balance', methods=['POST'])
def update_balance():
    new_balance = request.form.get('new_balance')
    user = current_user
    user.balance = float(new_balance)
    db.session.commit()
    return redirect(url_for('routes.budget_tracker'))


@routes.route('/delete_transaction/<transaction_id>', methods=['GET', 'POST'])
@login_required
def delete_transaction(transaction_id):
    """ Deletes a transaction from the user's budget. """
    transaction = Budget.query.get(transaction_id)
    if transaction and transaction.user_id == current_user.id:
        db.session.delete(transaction)
        db.session.commit()
        flash('Transaction deleted successfully!', 'success')
    else:
        flash('Transaction not found', 'danger')
    return redirect(url_for('routes.budget_tracker'))


""" Notes section. """


@routes.route('/add-note', methods=['GET', 'POST'])
@login_required
def add_note():
    """ Add a new note for the current user. """
    notes = current_user.notes
    title = request.form.get('title')
    content = request.form.get('content')

    if not title or not content:
        flash('Title and content are required to add a note.', 'error')
        return redirect(url_for('routes.notes'))

    new_note = Note(title=title, content=content,
                    user_id=current_user.get_id())
    db.session.add(new_note)
    db.session.commit()
    flash('Note added successfully!', 'success')
    return redirect(url_for('routes.notes'))


@routes.route('/edit-note', methods=['GET', 'POST'])
def edit_note():
    note_id = request.form.get('note_id')
    note_title = request.form.get('title')
    note_content = request.form.get('content')

    note = Note.query.get(note_id)

    if note:
        note.title = note_title
        note.content = note_content
        db.session.commit()
        flash('Note updated successfully!', 'success')
    else:
        flash('Note not found.', 'error')

    return redirect(url_for('routes.notes'))


@routes.route('/delete-note', methods=['POST'])
@login_required
def delete_note():
    """ Delete a note for the current user. """
    note_id = request.form.get('note_id')
    note = Note.query.get(note_id)

    if not note or note.user_id != current_user.get_id():
        flash('Note not found or unauthorized.', 'error')
        return redirect(url_for('routes.notes'))

    db.session.delete(note)
    db.session.commit()
    flash('Note deleted successfully!', 'success')
    return redirect(url_for('routes.notes'))