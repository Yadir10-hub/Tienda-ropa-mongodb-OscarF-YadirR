from flask import Blueprint, jsonify, request
from app.models.marca import MarcaModel


marcas = Blueprint("marcas", __name__)


# Obtener todas
@marcas.route("/marcas", methods=["GET"])
def obtener_marcas():

    return jsonify(
        MarcaModel.obtener_todos()
    )


# Crear
@marcas.route("/marcas", methods=["POST"])
def crear_marca():

    resultado = MarcaModel.crear(request.json)

    if resultado:

        return jsonify({
            "mensaje": "Marca creada correctamente",
            "id": str(resultado)
        }), 201

    return jsonify({
        "mensaje": "Error al crear la marca"
    }), 400



# Obtener por ID
@marcas.route("/marcas/<id>", methods=["GET"])
def obtener_marca(id):

    marca = MarcaModel.obtener_por_id(id)

    if marca:
        return jsonify(marca)

    return jsonify({
        "mensaje": "Marca no encontrada"
    }), 404



# Actualizar
@marcas.route("/marcas/<id>", methods=["PUT"])
def actualizar_marca(id):

    resultado = MarcaModel.actualizar(id, request.json)

    if resultado > 0:

        return jsonify({
            "mensaje": "Marca actualizada correctamente"
        })

    return jsonify({
        "mensaje": "No se pudo actualizar la marca"
    }), 404



# Eliminar
@marcas.route("/marcas/<id>", methods=["DELETE"])
def eliminar_marca(id):

    resultado = MarcaModel.eliminar(id)

    if resultado > 0:

        return jsonify({
            "mensaje": "Marca eliminada correctamente"
        })

    return jsonify({
        "mensaje": "Marca no encontrada"
    }), 404