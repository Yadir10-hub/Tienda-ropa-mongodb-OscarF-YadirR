from flask import Blueprint, jsonify, request
from app.models.venta import VentaModel


ventas = Blueprint("ventas", __name__)


# Obtener todas
@ventas.route("/ventas", methods=["GET"])
def obtener_ventas():

    return jsonify(
        VentaModel.obtener_todos()
    )


# Crear
@ventas.route("/ventas", methods=["POST"])
def crear_venta():

    resultado = VentaModel.crear(request.json)

    if resultado:

        return jsonify({
            "mensaje": "Venta creada correctamente",
            "id": str(resultado)
        }), 201

    return jsonify({
        "mensaje": "Error al crear la venta"
    }), 400



# Obtener por ID
@ventas.route("/ventas/<id>", methods=["GET"])
def obtener_venta(id):

    venta = VentaModel.obtener_por_id(id)

    if venta:
        return jsonify(venta)

    return jsonify({
        "mensaje": "Venta no encontrada"
    }), 404



# Actualizar
@ventas.route("/ventas/<id>", methods=["PUT"])
def actualizar_venta(id):

    resultado = VentaModel.actualizar(id, request.json)

    if resultado > 0:

        return jsonify({
            "mensaje": "Venta actualizada correctamente"
        })

    return jsonify({
        "mensaje": "No se pudo actualizar la venta"
    }), 404



# Eliminar
@ventas.route("/ventas/<id>", methods=["DELETE"])
def eliminar_venta(id):

    resultado = VentaModel.eliminar(id)

    if resultado > 0:

        return jsonify({
            "mensaje": "Venta eliminada correctamente"
        })

    return jsonify({
        "mensaje": "Venta no encontrada"
    }), 404