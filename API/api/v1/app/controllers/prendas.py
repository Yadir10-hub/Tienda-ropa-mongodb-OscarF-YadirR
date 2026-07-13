from flask import Blueprint, jsonify, request
from app.models.prenda import PrendaModel


prendas = Blueprint("prendas", __name__)


# Obtener todas
@prendas.route("/prendas", methods=["GET"])
def obtener_prendas():

    return jsonify(
        PrendaModel.obtener_todos()
    )


# Crear
@prendas.route("/prendas", methods=["POST"])
def crear_prenda():

    resultado = PrendaModel.crear(request.json)

    if resultado:

        return jsonify({
            "mensaje": "Prenda creada correctamente",
            "id": str(resultado)
        }), 201

    return jsonify({
        "mensaje": "Error al crear la prenda"
    }), 400



# Obtener por ID
@prendas.route("/prendas/<id>", methods=["GET"])
def obtener_prenda(id):

    prenda = PrendaModel.obtener_por_id(id)

    if prenda:
        return jsonify(prenda)

    return jsonify({
        "mensaje": "Prenda no encontrada"
    }), 404



# Actualizar
@prendas.route("/prendas/<id>", methods=["PUT"])
def actualizar_prenda(id):

    resultado = PrendaModel.actualizar(id, request.json)

    if resultado > 0:

        return jsonify({
            "mensaje": "Prenda actualizada correctamente"
        })

    return jsonify({
        "mensaje": "No se pudo actualizar la prenda"
    }), 404



# Eliminar
@prendas.route("/prendas/<id>", methods=["DELETE"])
def eliminar_prenda(id):

    resultado = PrendaModel.eliminar(id)

    if resultado > 0:

        return jsonify({
            "mensaje": "Prenda eliminada correctamente"
        })

    return jsonify({
        "mensaje": "Prenda no encontrada"
    }), 404