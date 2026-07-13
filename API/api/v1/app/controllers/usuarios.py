from flask import Blueprint, jsonify, request
from app.models.usuario import UsuarioModel

usuarios = Blueprint("usuarios", __name__)

#Ver

@usuarios.route("/usuarios", methods=["GET"])
def obtener_usuarios():

    return jsonify(
        UsuarioModel.obtener_todos()
    )
# Agregar
@usuarios.route("/usuarios", methods=["POST"])
def crear_usuario():

    resultado = UsuarioModel.crear(request.json)

    if resultado:
        return jsonify({
            "mensaje": "Usuario creado correctamente",
            "id": str(resultado)
        }), 201

    return jsonify({
        "mensaje": "Error al crear el usuario"
    }), 400

#Ver por ID
@usuarios.route("/usuarios/<id>", methods=["GET"])
def obtener_usuario(id):

    usuario = UsuarioModel.obtener_por_id(id)

    if usuario:
        return jsonify(usuario)

    return jsonify({
        "mensaje": "Usuario no encontrado"
    }), 404
    
#Actualizar
@usuarios.route("/usuarios/<id>", methods=["PUT"])
def actualizar_usuario(id):

    resultado = UsuarioModel.actualizar(id, request.json)

    if resultado > 0:
        return jsonify({
            "mensaje": "Usuario actualizado correctamente"
        })

    return jsonify({
        "mensaje": "No se pudo actualizar el usuario"
    }), 404
    
#Eliminar
@usuarios.route("/usuarios/<id>", methods=["DELETE"])
def eliminar_usuario(id):

    resultado = UsuarioModel.eliminar(id)

    if resultado > 0:
        return jsonify({
            "mensaje": "Usuario eliminado correctamente"
        })

    return jsonify({
        "mensaje": "Usuario no encontrado"
    }), 404
    
