from flask import Flask
from flask_pymongo import PyMongo
from flask_cors import CORS
import os


mongo = PyMongo()


def create_app():

    app = Flask(__name__)

    # Configuración MongoDB
    app.config["MONGO_URI"] = "mongodb+srv://ivanoferch010_db_user:SY9wZximJYsWKzHn@cluster0.nhwbyzc.mongodb.net/TiendaRopaDB"
    

    # Inicializar Mongo
    mongo.init_app(app)

    # Permitir peticiones externas
    CORS(app)

    # Registrar rutas
    from app.index import main
    app.register_blueprint(main)

    return app

