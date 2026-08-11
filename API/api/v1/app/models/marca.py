from bson.objectid import ObjectId
from app import mongo


class MarcaModel:

    @staticmethod
    def obtener_todos():

        marcas_cursor = mongo.db.marcas.find()
        marcas = []

        for marca in marcas_cursor:
            marca["_id"] = str(marca["_id"])
            marcas.append(marca)

        return marcas


    @staticmethod
    def obtener_por_id(id):

        try:
            marca = mongo.db.marcas.find_one({
                "_id": ObjectId(id)
            })

            if marca:
                marca["_id"] = str(marca["_id"])

            return marca

        except:
            return None


    @staticmethod
    def crear(marca):

        try:
            resultado = mongo.db.marcas.insert_one(marca)
            return resultado.inserted_id

        except:
            return None


    @staticmethod
    def actualizar(id, datos):

        try:
            resultado = mongo.db.marcas.update_one(
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
            resultado = mongo.db.marcas.delete_one({
                "_id": ObjectId(id)
            })

            return resultado.deleted_count

        except:
            return -1