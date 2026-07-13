from app import mongo


class ReporteModel:

    @staticmethod
    def ventas_por_fecha(fecha):

        resultado = list(
            mongo.db.ventas.aggregate([
                {
                    "$match": {
                        "fecha": fecha
                    }
                },
                {
                    "$group": {
                        "_id": "$fecha",
                        "totalVendido": {
                            "$sum": "$cantidad"
                        }
                    }
                }
            ])
        )

        return resultado


    @staticmethod
    def marcas_con_ventas():

        resultado = list(
            mongo.db.ventas.aggregate([
                {
                    "$lookup": {
                        "from": "prendas",
                        "localField": "prenda",
                        "foreignField": "nombre",
                        "as": "datosPrenda"
                    }
                },
                {
                    "$unwind": "$datosPrenda"
                },
                {
                    "$group": {
                        "_id": "$datosPrenda.marca"
                    }
                }
            ])
        )

        return resultado


    @staticmethod
    def inventario():

        resultado = list(
            mongo.db.ventas.aggregate([
                {
                    "$group": {
                        "_id": "$prenda",
                        "cantidadVendida": {
                            "$sum": "$cantidad"
                        }
                    }
                },
                {
                    "$lookup": {
                        "from": "prendas",
                        "localField": "_id",
                        "foreignField": "nombre",
                        "as": "datosPrenda"
                    }
                },
                {
                    "$unwind": "$datosPrenda"
                },
                {
                    "$project": {
                        "_id": 0,
                        "prenda": "$_id",
                        "cantidadVendida": 1,
                        "stockRestante": {
                            "$subtract": [
                                "$datosPrenda.cantidad",
                                "$cantidadVendida"
                            ]
                        }
                    }
                }
            ])
        )

        return resultado


    @staticmethod
    def top_marcas():

        resultado = list(
            mongo.db.ventas.aggregate([
                {
                    "$group": {
                        "_id": "$prenda",
                        "totalVendidas": {
                            "$sum": "$cantidad"
                        }
                    }
                },
                {
                    "$lookup": {
                        "from": "prendas",
                        "localField": "_id",
                        "foreignField": "nombre",
                        "as": "infoPrenda"
                    }
                },
                {
                    "$unwind": "$infoPrenda"
                },
                {
                    "$group": {
                        "_id": "$infoPrenda.marca",
                        "totalVentas": {
                            "$sum": "$totalVendidas"
                        }
                    }
                },
                {
                    "$sort": {
                        "totalVentas": -1
                    }
                },
                {
                    "$limit": 5
                }
            ])
        )

        return resultado