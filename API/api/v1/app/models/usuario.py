from bson.objectid import ObjectId
from app import mongo


class UsuarioModel:

    @staticmethod
    def obtener_todos():

        usuarios_cursor = mongo.db.usuarios.find()

        usuarios = []

        for usuario in usuarios_cursor:
            usuario["_id"] = str(usuario["_id"])
            usuarios.append(usuario)

        return usuarios


    @staticmethod
    def obtener_por_id(id):

        try:
            usuario = mongo.db.usuarios.find_one({
                "_id": ObjectId(id)
            })

            if usuario:
                usuario["_id"] = str(usuario["_id"])

            return usuario

        except:
            return None


    @staticmethod
    def crear(usuario):

        try:
            resultado = mongo.db.usuarios.insert_one(usuario)
            return resultado.inserted_id

        except:
            return None


    @staticmethod
    def actualizar(id, datos):

        try:
            resultado = mongo.db.usuarios.update_one(
                {
                    "_id": ObjectId(id)
                },
                {
                    "$set": datos
                }
            )

            return resultado.modified_count

        except:
            return -1


    @staticmethod
    def eliminar(id):

        try:
            resultado = mongo.db.usuarios.delete_one({
                "_id": ObjectId(id)
            })

            return resultado.deleted_count

        except:
            return -1