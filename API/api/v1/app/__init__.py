from flask import Flask
from flask_pymongo import PyMongo
from flask_cors import CORS
import os
from dotenv import load_dotenv
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ENV_PATH = os.path.join(BASE_DIR, ".env")
with open(ENV_PATH, "r", encoding="utf-8") as f:
    print("CONTENIDO DEL .env:")
    print(repr(f.read()))

print("BASE_DIR =", BASE_DIR)
print("ENV_PATH =", ENV_PATH)
print("EXISTE =", os.path.exists(ENV_PATH))

load_dotenv(dotenv_path=ENV_PATH, override=True)
mongo = PyMongo()

def create_app():

    app = Flask(__name__)

    # Configuración MongoDB
    uri = os.environ.get("MONGO_URI")
    print("URI:", uri)

    app.config["MONGO_URI"] = uri

    # Inicializar Mongo
    mongo.init_app(app)   # <-- ESTA LÍNEA FALTA

    print("MONGO_URI =", os.getenv("MONGO_URI"))

    # Permitir peticiones externas
    CORS(app)

    # Registrar rutas
    from app.index import main
    app.register_blueprint(main)

    return app

