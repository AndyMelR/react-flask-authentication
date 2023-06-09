"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, render_template, redirect, request, session, url_for, Blueprint, jsonify
from flask_sqlalchemy import SQLAlchemy
from api.user_service import UserService;
from api.models import User
from flask_jwt_extended import (create_access_token, get_jwt_identity, jwt_required)



api = Blueprint('api', __name__)
user_service = UserService()


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Bienvenido! Esto es un ejercicio de API. Espero que te guste."
    }

    return jsonify(response_body), 200

# Ruta para el registro de usuarios
@api.route('/signup', methods=['POST']) 
def signup():
    password = request.json.get('password', None)
    email = request.json.get('email', None)
    is_active = request.json.get('is_active', True)
    try:
        user_service.add_user(password, email, is_active)
    except Exception as e:
        print(e)
        return jsonify({'message':f'error: {e}'}), 400

    return jsonify({'message':'all ok'}), 200 

# Ruta para el inicio de sesión

@api.route('/login', methods=['POST'])
def login():
    email = request.json.get("email")
    password = request.json.get("password")
    try:  
        user = user_service.get_user(email, password)
        print(user)
        if user is None:
            return jsonify({"msg":"Bad request, email or password not valid"}), 401
        access_token = user_service.login(email, password)
        return jsonify({"token": access_token}), 200
    except Exception as e:
        return jsonify({"error": e}), 400

@api.route("/token", methods=["POST"])
def create_token():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    # Consulta la base de datos por el nombre de usuario y la contraseña
    user = User.filter.query(username=username, password=password).first()
    if User is None:
          # el usuario no se encontró en la base de datos
        return jsonify({"msg": "Bad username or password"}), 401
    
    # crea un nuevo token con el id de usuario dentro
    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token, "user_id": user.id })
    
@api.route('/users', methods=['GET']) 
def get_users():
    try:
        users = user_service.get_all_users()
        return jsonify({'users': users}), 200 
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    
@api.route('/user/<int:id>', methods=['GET']) 
def get_specific_user(id):
    try:
        user = user_service.get_specific_user(id)
        return jsonify({'user': user.serialize()}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    
@api.route("/private", methods=["GET"])
@jwt_required()
def private():
    # Accede a la identidad del usuario actual con get_jwt_identity
    current_user_id = get_jwt_identity()
    user = User.filter.get(current_user_id)
    
    return jsonify({"id": user.id, "username": user.username }), 200


@api.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    current_user_id = get_jwt_identity()
    user = User.filter.get(current_user_id)
    return jsonify({'message': 'Logout exitoso'})

