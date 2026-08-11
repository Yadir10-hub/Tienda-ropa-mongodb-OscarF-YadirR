from flask import Blueprint
from app.controllers.usuarios import usuarios
from app.controllers.marcas import marcas
from app.controllers.prendas import prendas
from app.controllers.ventas import ventas
from app.controllers.reportes import reportes

main = Blueprint("main", __name__)


main.register_blueprint(usuarios)
main.register_blueprint(marcas)
main.register_blueprint(prendas)
main.register_blueprint(ventas)
main.register_blueprint(reportes)

@main.route("/")
def inicio():
    return {
        "mensaje": "API Tienda de Ropa funcionando"
    }
    



