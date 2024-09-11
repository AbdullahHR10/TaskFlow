""" Define authentication routes for the Flask application. """
from flask import Blueprint, render_template, request, flash, redirect
from flask import url_for
from flask_login import login_user, login_required, logout_user, current_user
from .models.user import User
from werkzeug.security import generate_password_hash, check_password_hash
from website import db


auth = Blueprint('auth', __name__)


@auth.route('/login', methods=['GET', 'POST'])
def login():
    """ Logs the user in. """
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')

        user = User.query.filter_by(username=username).first()
        if user:
            if check_password_hash(user.password, password):
                flash('Logged in successfully!', 'success')
                login_user(user, remember=True)
                return redirect(url_for('routes.home'))
            else:
                flash('Incorrect Password.', 'error')
        else:
            flash('Username does not exist.', 'error')
    return render_template('login.html', user=current_user)


@auth.route('/logout')
@login_required
def logout():
    """ Logs the user out. """
    logout_user()
    return redirect(url_for('routes.welcome'))


@auth.route('/signup', methods=['GET', 'POST'])
def sign_up():
    """ Signs the user up. """
    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')
        confirm_password = request.form.get('confirm_password')

        user_by_email = User.query.filter_by(email=email).first()

        user = User.query.filter_by(username=username).first()
        if user:
            flash('Username already exists.', category='error')
        elif len(username) < 3:
            flash("Username must be at least 3 characters.", 'error')
        elif user_by_email:
            flash('Email is already in use.', category='error')
        elif len(password) < 6:
            flash("Password must be at least 6 characters.", 'error')
        elif confirm_password != password:
            flash("Passwords don\'t match.", category='error')
        else:
            new_user = User(
                username=username,
                email=email,
                password=generate_password_hash(
                    password,
                    method='pbkdf2:sha256'
                )
            )

            db.session.add(new_user)
            db.session.commit()
            login_user(new_user, remember=True)
            flash("Account created!", 'success')
            return redirect(url_for('routes.home'))

    return render_template('signup.html', user=current_user)