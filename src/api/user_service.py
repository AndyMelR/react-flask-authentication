from flask import Flask
from flask_jwt_extended import JWTManager, create_access_token,get_jwt_identity
from api.models import db, User

class UserService():
    def add_user( self, password, email, is_active):
        new_user = User(password = password,
                        email = email,
                        is_active = is_active)
        db.session.add(new_user)
        db.session.commit()

    def get_all_users(self):
        users = User.query.all()
        users = [user.serialize() for user in users]
        return users

    def get_specific_user(self, id):
        user = User.query.filter_by(id=id).first()
        return user

    def reset_password(self, id, new_password):
        user = User.query.filter_by(id=id).first()
        user.password = new_password
        db.session.add(user)
        db.session.commit()
        return new_password

    def get_user(self, email, password):
        return User.query.filter_by(email=email, password=password).first()

    def login(self, email, password):
        user = User.query.filter_by(email=email, password=password).first()
        access_token = create_access_token(identity=user.id)
        return access_token

    
