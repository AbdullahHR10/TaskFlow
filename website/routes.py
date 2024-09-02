""" Define routes for the Flask application. """
from flask import Blueprint, render_template, redirect, url_for, request
from flask import flash, jsonify
import smtplib
from flask_login import login_required, current_user
from .models.task import Task
from website import db
from datetime import datetime

routes = Blueprint('routes', __name__)


@routes.route('/')
def index(): 
    """ Render the landing page for logged-in users or redirect to home page for others."""
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

""" Home section. """


@routes.route('/suggestions', methods=['GET', 'POST'])
@login_required
def suggestions():
    """ Returns url for suggestions.html """
    return render_template('suggestions.html')


""" Tasks list section. """


@routes.route('/add-task', methods=['GET', 'POST'])
@login_required
def add_task():
    """ Adds a task in tasks list """
    if request.method == 'POST':
        task_title = request.form.get('task_title')
        task_description = request.form.get('task_description')
        due_date_str = request.form.get('due_datetime')

        if not task_title or not task_description or not due_date_str:
            flash('All fields are required.', 'error')
            return redirect(url_for('routes.to_do_list'))

        try:
            due_date = datetime.strptime(due_date_str, '%Y-%m-%dT%H:%M')
        except ValueError:
            flash('Invalid date format. Please use YYYY-MM-DDTHH:MM.', 'error')
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

    pending_tasks = Task.query.filter_by(user_id=user_id, status='pending').all()

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

    completed_tasks = Task.query.filter_by(user_id=user_id, status='completed').all()

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