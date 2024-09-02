""" Initializes Flask application and register Blueprints """
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from os import path
from flask_login import LoginManager


db = SQLAlchemy()
DB_NAME = "database.db"


def create_app():
    """ Doc """
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'Secret Key'
    app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{DB_NAME}"
    db.init_app(app)

    from .routes import routes
    from .auth import auth

    app.register_blueprint(routes, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')

    from .models.user import User
    from .models.task import Task
    from .models.habit import Habit
    from .models.budget import Budget
    from .models.note import Note

    with app.app_context():
        db.create_all()

    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(id):
        return User.query.get(str(id))

    return app

def create_database(app):
    """ Doc """
    if not path.exists('website/' + DB_NAME):
        db.create_all(app=app)