from bson.objectid import ObjectId
from app import mongo


class VentaModel:

    @staticmethod
    def obtener_todos():

        ventas_cursor = mongo.db.ventas.find()
        ventas = []

        for venta in ventas_cursor:
            venta["_id"] = str(venta["_id"])
            ventas.append(venta)

        return ventas


    @staticmethod
    def obtener_por_id(id):

        try:
            venta = mongo.db.ventas.find_one({
                "_id": ObjectId(id)
            })

            if venta:
                venta["_id"] = str(venta["_id"])

            return venta

        except:
            return None


    @staticmethod
    def crear(venta):

        try:
            resultado = mongo.db.ventas.insert_one(venta)
            return resultado.inserted_id

        except:
            return None


    @staticmethod
    def actualizar(id, datos):

        try:
            resultado = mongo.db.ventas.update_one(
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
            resultado = mongo.db.ventas.delete_one({
                "_id": ObjectId(id)
            })

            return resultado.deleted_count

        except:
            return -1