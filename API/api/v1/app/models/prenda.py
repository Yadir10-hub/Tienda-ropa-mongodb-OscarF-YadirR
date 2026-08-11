from bson.objectid import ObjectId
from app import mongo


class PrendaModel:

    @staticmethod
    def obtener_todos():

        prendas_cursor = mongo.db.prendas.find()
        prendas = []

        for prenda in prendas_cursor:
            prenda["_id"] = str(prenda["_id"])
            prendas.append(prenda)

        return prendas


    @staticmethod
    def obtener_por_id(id):

        try:
            prenda = mongo.db.prendas.find_one({
                "_id": ObjectId(id)
            })

            if prenda:
                prenda["_id"] = str(prenda["_id"])

            return prenda

        except:
            return None


    @staticmethod
    def crear(prenda):

        try:
            resultado = mongo.db.prendas.insert_one(prenda)
            return resultado.inserted_id

        except:
            return None


    @staticmethod
    def actualizar(id, datos):

        try:
            resultado = mongo.db.prendas.update_one(
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
            resultado = mongo.db.prendas.delete_one({
                "_id": ObjectId(id)
            })

            return resultado.deleted_count

        except:
            return -1