from flask import Blueprint, jsonify
from app import mongo
from app.models.reporte import ReporteModel

reportes = Blueprint("reportes", __name__)

# Ventas por fecha
@reportes.route("/reportes/ventas-fecha/<fecha>", methods=["GET"])
def ventas_por_fecha(fecha):

    return jsonify(
        ReporteModel.ventas_por_fecha(fecha)
    )
# Marcas con sus Ventas
@reportes.route("/reportes/marcas-ventas", methods=["GET"])
def marcas_con_ventas():

    return jsonify(
        ReporteModel.marcas_con_ventas()
    )


#Inventario
@reportes.route("/reportes/inventario", methods=["GET"])
def inventario():

    return jsonify(
        ReporteModel.inventario()
    )

#Top Marcas
@reportes.route("/reportes/top-marcas", methods=["GET"])
def top_marcas():

    return jsonify(
        ReporteModel.top_marcas()
    )