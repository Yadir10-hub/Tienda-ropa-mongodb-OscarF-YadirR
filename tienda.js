use("TiendaRopaDB");

// ====================
// CRUD USUARIOS
// ====================

// Insertar Uno

db.usuarios.insertOne({
    nombre: "Yadir Rivera",
    correo: "yadir9090@gmail.com",
    telefono: "89878789"
});

// Insertar Varios
db.usuarios.insertMany([
{
    nombre: "Oscar Fernández",
    correo: "ivan010@gmail.com",
    telefono: "81818181"
},
{
    nombre: "María López",
    correo: "marialp@gmail.com",
    telefono: "88183160"
}
]);


// Actualizar Uno
db.usuarios.updateOne(
    { nombre: "Oscar Fernández" },
    { $set: { telefono: "60298401" } }
);

// Borrar Uno
db.usuarios.deleteOne(
    { nombre: "María López" }
);

// ====================
// CRUD MARCAS
// ====================

// Insertar Uno
db.marcas.insertOne({
    nombre: "Nike",
    pais: "Costa Rica"
});

// Insertar Varios
db.marcas.insertMany([{
    nombre: "Adidas",
    pais: "USA"
},
{
    nombre: "Civilroad",
    pais: "Costa Rica"
},
{
    nombre: "Puma",
    pais: "USA"
}
]);


// Actualizar Uno
db.marcas.updateOne(
    { nombre: "Nike" },
    { $set: { pais: "USA"} }
);
// Borrar Uno
db.marcas.deleteOne(
    { nombre: "Puma" }
);

// ====================
// CRUD PRENDAS
// ====================

// Insertar Uno
db.prendas.insertOne({
    nombre: "Camisa Deportiva",
    marca: "Nike",
    precio: 15000,
    cantidad: 70
});




// Insertar Varios
db.prendas.insertMany([{
    nombre: "Pantalón Deportivo",
    marca: "Adidas",
    precio: 22000,
    cantidad: 50
},

{
    nombre: "Sudadera Training",
    marca: "Civilroad",
    precio: 28000,
    cantidad: 35
},

{
    nombre: "Short Running",
    marca: "Nike",
    precio: 12000,
    cantidad: 60
},

{
    nombre: "Jacket Impermeable",
    marca: "Adidas",
    precio: 35000,
    cantidad: 25
}
]);



// Actualizar Uno

db.prendas.updateOne(
    { nombre: "Sudadera Training" },
    { $set: { precio: 30000} }
);

// Borrar Uno

db.prendas.deleteOne(
    { nombre: "Pantalón Deportivo" }
);


// ====================
// CRUD VENTAS
// ====================

db.ventas.insertOne({
    cliente: "Oscar Fernández",
    fecha: "2026-06-01",
    prenda: "Camisa Deportiva",
    cantidad: 2,
    total: 30000
});

// Insertar Varios

db.ventas.insertMany([
{
    cliente: "Yadir Rivera",
    fecha: "2026-06-01",
    prenda: "Short Running",
    cantidad: 1,
    total: 12000
},
{
    cliente: "Oscar Fernández",
    fecha: "2026-06-02",
    prenda: "Jacket Impermeable",
    cantidad: 1,
    total: 35000
},
{
    cliente: "Yadir Rivera",
    fecha: "2026-06-02",
    prenda: "Sudadera Training",
    cantidad: 2,
    total: 60000
},
{
    cliente: "Oscar Fernández",
    fecha: "2026-06-03",
    prenda: "Short Running",
    cantidad: 3,
    total: 36000
},
{
    cliente: "Yadir Rivera",
    fecha: "2026-06-03",
    prenda: "Camisa Deportiva",
    cantidad: 1,
    total: 15000
}
]);

// Actualizar Uno
db.ventas.updateOne(
    { cliente: "Oscar Fernández", fecha: "2026-06-03" },
    { $set: { cantidad: 4 } }
);

// Borrar Uno

db.ventas.deleteOne(
    { cliente: "Yadir Rivera", fecha: "2026-06-03" }
);



//CONSULTAS

// Obtiene la cantidad total de prendas vendidas para una fecha específica.
db.ventas.aggregate([
    {
        $match: {
            fecha: "2026-06-01"
        }
    },
    {
        $group: {
            _id: "$fecha",
            totalVendido: { $sum: "$cantidad" }
        }
    }
]);

// Obtiene la lista de todas las marcas que tienen al menos una venta.
db.ventas.aggregate([
    {
        $lookup: {
            from: "prendas",
            localField: "prenda",
            foreignField: "nombre",
            as: "datosPrenda"
        }
    },
    {
        $unwind: "$datosPrenda"
    },
    {
        $group: {
            _id: "$datosPrenda.marca"
        }
    }
]);

// Obtiene las prendas vendidas y la cantidad restante en stock.
db.ventas.aggregate([
    {
        $group: {
            _id: "$prenda",
            cantidadVendida: { $sum: "$cantidad" }
        }
    },
    {
        $lookup: {
            from: "prendas",
            localField: "_id",
            foreignField: "nombre",
            as: "datosPrenda"
        }
    },
    {
        $unwind: "$datosPrenda"
    },
    {
        $project: {
            _id: 0,
            prenda: "$_id",
            cantidadVendida: 1,
            stockRestante: {
                $subtract: [
                    "$datosPrenda.cantidad",
                    "$cantidadVendida"
                ]
            }
        }
    }
]);

// Obtiene el top 5 de marcas más vendidas y su cantidad total de ventas.
db.ventas.aggregate([
    // 1. Agrupar ventas por prenda
    {
        $group: {
            _id: "$prenda",
            totalVendidas: { $sum: "$cantidad" }
        }
    },

    // 2. Unir con la colección prendas para obtener la marca
    {
        $lookup: {
            from: "prendas",
            localField: "_id",
            foreignField: "nombre",
            as: "infoPrenda"
        }
    },

    // 3. Desenrollar el array
    {
        $unwind: "$infoPrenda"
    },

    // 4. Agrupar ahora por marca
    {
        $group: {
            _id: "$infoPrenda.marca",
            totalVentas: { $sum: "$totalVendidas" }
        }
    },

    // 5. Ordenar de mayor a menor
    {
        $sort: {
            totalVentas: -1
        }
    },

    // 6. Limitar a 5 resultados
    {
        $limit: 5
    }
]);

