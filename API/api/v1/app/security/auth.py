from flask import request, jsonify
from functools import wraps


TOKEN_VALIDO = "tienda123"


def validar_token(func):
    @wraps(func)
    def wrapper(*args, **kwargs):

        auth_header = request.headers.get("Authorization")

        if not auth_header:
            return jsonify({
                "mensaje": "Token requerido"
            }), 401

        if not auth_header.startswith("Bearer "):
            return jsonify({
                "mensaje": "Formato de token incorrecto"
            }), 401

        token = auth_header.split(" ")[1]

        if token != TOKEN_VALIDO:
            return jsonify({
                "mensaje": "Token inválido"
            }), 403

        return func(*args, **kwargs)

    return wrapper