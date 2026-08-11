# Tienda de Ropa MongoDB

## Descripción del proyecto

Este proyecto consiste en el diseño e implementación de una base de datos NoSQL en MongoDB y una API REST desarrollada con Python y Flask para la gestión de una tienda de ropa.

La aplicación permite administrar las siguientes colecciones:

- Usuarios
- Marcas
- Prendas
- Ventas

La API implementa operaciones CRUD (Crear, Leer, Actualizar y Eliminar) para cada colección y reportes de ventas e inventario mediante consultas de agregación de MongoDB.

---

## Objetivos

- Aplicar conceptos de bases de datos NoSQL.
- Utilizar MongoDB Atlas para almacenar la información.
- Desarrollar una API REST utilizando Python y Flask.
- Aplicar una arquitectura por capas con controladores y modelos.
- Implementar operaciones CRUD para cada colección.
- Crear reportes mediante consultas de agregación.
- Probar los endpoints mediante Postman.
- Utilizar GitHub para el control de versiones y el trabajo colaborativo.

---

## Tecnologías utilizadas

- Python
- Flask
- Flask-PyMongo
- PyMongo
- MongoDB Atlas
- MongoDB Compass
- Postman
- Git y GitHub
- Markdown

---

## Arquitectura de la API

El proyecto utiliza una arquitectura por capas:

- **Controladores:** reciben las solicitudes HTTP y retornan las respuestas en formato JSON.
- **Modelos:** realizan las operaciones sobre las colecciones de MongoDB.
- **Utilidades:** contienen funciones auxiliares del proyecto.
- **Archivo principal:** crea la aplicación Flask, configura MongoDB y registra las rutas.

Cada colección posee su propio controlador y modelo.

---

## Estructura del proyecto

```text
Tienda-ropa-mongodb-OscarF-YadirR/
│
├── API/
│   ├── api/
│   │   └── v1/
│   │       ├── app/
│   │       │   ├── controllers/
│   │       │   │   ├── usuarios.py
│   │       │   │   ├── marcas.py
│   │       │   │   ├── prendas.py
│   │       │   │   ├── ventas.py
│   │       │   │   └── reportes.py
│   │       │   ├── models/
│   │       │   │   ├── usuario.py
│   │       │   │   ├── marca.py
│   │       │   │   ├── prenda.py
│   │       │   │   ├── venta.py
│   │       │   │   └── reporte.py
│   │       │   ├── utils/
│   │       │   ├── __init__.py
│   │       │   └── index.py
│   │       └── run.py
│   ├── coleccion-postman/
│   ├── .env.example
│   ├── .gitignore
│   ├── README.md
│   └── requirements.txt
│
├── database/
│   └── tienda.js
│
├── .gitignore
└── README.md
```

---

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/Yadir10-hub/Tienda-ropa-mongodb-OscarF-YadirR.git
cd Tienda-ropa-mongodb-OscarF-YadirR
```

### 2. Entrar en la carpeta de la API

```bash
cd API
```

### 3. Crear el entorno virtual

```bash
python -m venv venv
```

### 4. Activar el entorno virtual

En Windows:

```bash
venv\Scripts\activate
```

En macOS o Linux:

```bash
source venv/bin/activate
```

### 5. Instalar las dependencias

```bash
pip install -r requirements.txt
```

### 6. Configurar las variables de entorno

Crear un archivo llamado `.env` dentro de la carpeta `API` tomando como guía `.env.example`.

```env
MONGO_URI=mongodb+srv://USUARIO:CONTRASENA@CLUSTER.mongodb.net/TiendaRopaDB?retryWrites=true&w=majority
FLASK_DEBUG=True
```

El archivo `.env` contiene información privada y no debe subirse a GitHub.

### 7. Ejecutar la API

```bash
cd api/v1
python run.py
```

La API se ejecuta de forma predeterminada en:

```text
http://127.0.0.1:5000
```

Para verificar que está funcionando:

```http
GET http://127.0.0.1:5000/
```

Respuesta esperada:

```json
{
  "mensaje": "API Tienda de Ropa funcionando"
}
```

---

# Documentación de la API

## Consideraciones generales

- Todas las respuestas se devuelven en formato JSON.
- Para las solicitudes `POST` y `PUT`, se debe seleccionar en Postman: **Body → raw → JSON**.
- El encabezado utilizado es:

```http
Content-Type: application/json
```

- Los identificadores corresponden al campo `_id` generado por MongoDB.
- En las URLs de ejemplo, reemplace `{id}` por un identificador real de MongoDB.

## URL base

```text
http://127.0.0.1:5000
```

---

## Resumen de endpoints

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/usuarios` | Obtener todos los usuarios |
| GET | `/usuarios/{id}` | Obtener un usuario por ID |
| POST | `/usuarios` | Crear un usuario |
| PUT | `/usuarios/{id}` | Actualizar un usuario |
| DELETE | `/usuarios/{id}` | Eliminar un usuario |
| GET | `/marcas` | Obtener todas las marcas |
| GET | `/marcas/{id}` | Obtener una marca por ID |
| POST | `/marcas` | Crear una marca |
| PUT | `/marcas/{id}` | Actualizar una marca |
| DELETE | `/marcas/{id}` | Eliminar una marca |
| GET | `/prendas` | Obtener todas las prendas |
| GET | `/prendas/{id}` | Obtener una prenda por ID |
| POST | `/prendas` | Crear una prenda |
| PUT | `/prendas/{id}` | Actualizar una prenda |
| DELETE | `/prendas/{id}` | Eliminar una prenda |
| GET | `/ventas` | Obtener todas las ventas |
| GET | `/ventas/{id}` | Obtener una venta por ID |
| POST | `/ventas` | Crear una venta |
| PUT | `/ventas/{id}` | Actualizar una venta |
| DELETE | `/ventas/{id}` | Eliminar una venta |
| GET | `/reportes/ventas-fecha/{fecha}` | Obtener la cantidad vendida en una fecha |
| GET | `/reportes/marcas-ventas` | Listar marcas con al menos una venta |
| GET | `/reportes/inventario` | Mostrar prendas vendidas y stock restante |
| GET | `/reportes/top-marcas` | Mostrar las cinco marcas más vendidas |

---

# Endpoints de usuarios

Los usuarios representan a los clientes registrados en la tienda.

## Obtener todos los usuarios

Obtiene la lista completa de documentos almacenados en la colección `usuarios`.

**Método:** `GET`

**URL:**

```http
http://127.0.0.1:5000/usuarios
```

**Respuesta de ejemplo:**

```json
[
  {
    "_id": "ID_DEL_USUARIO",
    "nombre": "Yadir Rivera",
    "correo": "yadir9090@gmail.com",
    "telefono": "89878789"
  }
]
```

## Obtener un usuario por ID

Busca un usuario específico mediante su identificador de MongoDB.

**Método:** `GET`

**URL:**

```http
http://127.0.0.1:5000/usuarios/{id}
```

**Ejemplo:**

```http
http://127.0.0.1:5000/usuarios/64f123456789abcdef123456
```

Si el usuario no existe, la API responde con código `404`.

## Crear un usuario

Inserta un nuevo documento en la colección `usuarios`.

**Método:** `POST`

**URL:**

```http
http://127.0.0.1:5000/usuarios
```

**Body JSON:**

```json
{
  "nombre": "Ana Rodríguez",
  "correo": "ana@gmail.com",
  "telefono": "88887777"
}
```

**Respuesta de ejemplo:**

```json
{
  "mensaje": "Usuario creado correctamente",
  "id": "ID_GENERADO"
}
```

Código de respuesta: `201 Created`.

## Actualizar un usuario

Actualiza los datos de un usuario existente.

**Método:** `PUT`

**URL:**

```http
http://127.0.0.1:5000/usuarios/{id}
```

**Body JSON:**

```json
{
  "nombre": "Ana Rodríguez",
  "correo": "ana.rodriguez@gmail.com",
  "telefono": "60001111"
}
```

**Respuesta de ejemplo:**

```json
{
  "mensaje": "Usuario actualizado correctamente"
}
```

## Eliminar un usuario

Elimina un usuario mediante su identificador.

**Método:** `DELETE`

**URL:**

```http
http://127.0.0.1:5000/usuarios/{id}
```

**Respuesta de ejemplo:**

```json
{
  "mensaje": "Usuario eliminado correctamente"
}
```

---

# Endpoints de marcas

Las marcas representan los fabricantes o proveedores de las prendas.

## Obtener todas las marcas

**Método:** `GET`

**URL:**

```http
http://127.0.0.1:5000/marcas
```

**Respuesta de ejemplo:**

```json
[
  {
    "_id": "ID_DE_LA_MARCA",
    "nombre": "Nike",
    "pais": "Estados Unidos"
  }
]
```

## Obtener una marca por ID

**Método:** `GET`

**URL:**

```http
http://127.0.0.1:5000/marcas/{id}
```

Si la marca no existe, la API responde con código `404`.

## Crear una marca

**Método:** `POST`

**URL:**

```http
http://127.0.0.1:5000/marcas
```

**Body JSON:**

```json
{
  "nombre": "Puma",
  "pais": "Alemania"
}
```

**Respuesta de ejemplo:**

```json
{
  "mensaje": "Marca creada correctamente",
  "id": "ID_GENERADO"
}
```

Código de respuesta: `201 Created`.

## Actualizar una marca

**Método:** `PUT`

**URL:**

```http
http://127.0.0.1:5000/marcas/{id}
```

**Body JSON:**

```json
{
  "nombre": "Puma",
  "pais": "Alemania"
}
```

**Respuesta de ejemplo:**

```json
{
  "mensaje": "Marca actualizada correctamente"
}
```

## Eliminar una marca

**Método:** `DELETE`

**URL:**

```http
http://127.0.0.1:5000/marcas/{id}
```

**Respuesta de ejemplo:**

```json
{
  "mensaje": "Marca eliminada correctamente"
}
```

---

# Endpoints de prendas

Las prendas representan los productos disponibles en la tienda.

## Obtener todas las prendas

**Método:** `GET`

**URL:**

```http
http://127.0.0.1:5000/prendas
```

**Respuesta de ejemplo:**

```json
[
  {
    "_id": "ID_DE_LA_PRENDA",
    "nombre": "Camisa Deportiva",
    "marca": "Nike",
    "precio": 15000,
    "cantidad": 70
  }
]
```

## Obtener una prenda por ID

**Método:** `GET`

**URL:**

```http
http://127.0.0.1:5000/prendas/{id}
```

Si la prenda no existe, la API responde con código `404`.

## Crear una prenda

**Método:** `POST`

**URL:**

```http
http://127.0.0.1:5000/prendas
```

**Body JSON:**

```json
{
  "nombre": "Sudadera Deportiva",
  "marca": "Nike",
  "precio": 28000,
  "cantidad": 35
}
```

**Respuesta de ejemplo:**

```json
{
  "mensaje": "Prenda creada correctamente",
  "id": "ID_GENERADO"
}
```

Código de respuesta: `201 Created`.

## Actualizar una prenda

**Método:** `PUT`

**URL:**

```http
http://127.0.0.1:5000/prendas/{id}
```

**Body JSON:**

```json
{
  "nombre": "Sudadera Deportiva",
  "marca": "Nike",
  "precio": 30000,
  "cantidad": 30
}
```

**Respuesta de ejemplo:**

```json
{
  "mensaje": "Prenda actualizada correctamente"
}
```

## Eliminar una prenda

**Método:** `DELETE`

**URL:**

```http
http://127.0.0.1:5000/prendas/{id}
```

**Respuesta de ejemplo:**

```json
{
  "mensaje": "Prenda eliminada correctamente"
}
```

---

# Endpoints de ventas

Las ventas registran las transacciones realizadas por los clientes.

## Obtener todas las ventas

**Método:** `GET`

**URL:**

```http
http://127.0.0.1:5000/ventas
```

**Respuesta de ejemplo:**

```json
[
  {
    "_id": "ID_DE_LA_VENTA",
    "cliente": "Oscar Fernández",
    "fecha": "2026-06-01",
    "prenda": "Camisa Deportiva",
    "cantidad": 2,
    "total": 30000
  }
]
```

## Obtener una venta por ID

**Método:** `GET`

**URL:**

```http
http://127.0.0.1:5000/ventas/{id}
```

Si la venta no existe, la API responde con código `404`.

## Crear una venta

**Método:** `POST`

**URL:**

```http
http://127.0.0.1:5000/ventas
```

**Body JSON:**

```json
{
  "cliente": "Yadir Rivera",
  "fecha": "2026-06-03",
  "prenda": "Camisa Deportiva",
  "cantidad": 2,
  "total": 30000
}
```

**Respuesta de ejemplo:**

```json
{
  "mensaje": "Venta creada correctamente",
  "id": "ID_GENERADO"
}
```

Código de respuesta: `201 Created`.

## Actualizar una venta

**Método:** `PUT`

**URL:**

```http
http://127.0.0.1:5000/ventas/{id}
```

**Body JSON:**

```json
{
  "cliente": "Yadir Rivera",
  "fecha": "2026-06-03",
  "prenda": "Camisa Deportiva",
  "cantidad": 3,
  "total": 45000
}
```

**Respuesta de ejemplo:**

```json
{
  "mensaje": "Venta actualizada correctamente"
}
```

## Eliminar una venta

**Método:** `DELETE`

**URL:**

```http
http://127.0.0.1:5000/ventas/{id}
```

**Respuesta de ejemplo:**

```json
{
  "mensaje": "Venta eliminada correctamente"
}
```

---

# Endpoints de reportes

Los reportes utilizan consultas de agregación de MongoDB y solamente requieren el método `GET`.

## Reporte de ventas por fecha

Obtiene la cantidad total de prendas vendidas en una fecha específica.

**Método:** `GET`

**URL:**

```http
http://127.0.0.1:5000/reportes/ventas-fecha/{fecha}
```

**Ejemplo:**

```http
http://127.0.0.1:5000/reportes/ventas-fecha/2026-06-01
```

**Respuesta de ejemplo:**

```json
[
  {
    "_id": "2026-06-01",
    "totalVendido": 3
  }
]
```

## Reporte de marcas con al menos una venta

Lista las marcas relacionadas con una o más ventas registradas.

**Método:** `GET`

**URL:**

```http
http://127.0.0.1:5000/reportes/marcas-ventas
```

**Respuesta de ejemplo:**

```json
[
  {
    "_id": "Nike"
  },
  {
    "_id": "Adidas"
  }
]
```

## Reporte de prendas vendidas y stock restante

Muestra cada prenda vendida, la cantidad total vendida y el inventario restante.

**Método:** `GET`

**URL:**

```http
http://127.0.0.1:5000/reportes/inventario
```

**Respuesta de ejemplo:**

```json
[
  {
    "prenda": "Camisa Deportiva",
    "cantidadVendida": 3,
    "stockRestante": 67
  }
]
```

## Reporte de las cinco marcas más vendidas

Agrupa las ventas por marca, ordena el resultado de mayor a menor y limita la consulta a cinco marcas.

**Método:** `GET`

**URL:**

```http
http://127.0.0.1:5000/reportes/top-marcas
```

**Respuesta de ejemplo:**

```json
[
  {
    "_id": "Nike",
    "totalVentas": 7
  },
  {
    "_id": "Adidas",
    "totalVentas": 4
  }
]
```

---

## Códigos de respuesta HTTP

| Código | Significado |
|---|---|
| `200 OK` | Solicitud realizada correctamente |
| `201 Created` | Documento creado correctamente |
| `400 Bad Request` | No se pudo crear el documento |
| `404 Not Found` | Documento no encontrado o no actualizado |
| `500 Internal Server Error` | Error interno del servidor |

---

## Demostración en Postman

Para realizar la demostración:

1. Ejecutar la API con `python run.py`.
2. Abrir Postman.
3. Crear una colección llamada `Tienda de Ropa MongoDB API`.
4. Agregar las solicitudes de usuarios, marcas, prendas, ventas y reportes.
5. Para `POST` y `PUT`, seleccionar **Body → raw → JSON**.
6. Ejecutar cada solicitud y verificar el código HTTP y la respuesta JSON.
7. Copiar un `_id` obtenido mediante un `GET` para probar las operaciones por identificador.
8. Exportar la colección en formato JSON.
9. Guardar el archivo exportado dentro de:

```text
API/coleccion-postman/
```

Nombre sugerido:

```text
TiendaRopaAPI.postman_collection.json
```

---

## Colecciones implementadas

### Usuarios

```json
{
  "nombre": "Yadir Rivera",
  "correo": "yadir9090@gmail.com",
  "telefono": "89878789"
}
```

### Marcas

```json
{
  "nombre": "Nike",
  "pais": "Costa Rica"
}
```

### Prendas

```json
{
  "nombre": "Camisa Deportiva",
  "marca": "Nike",
  "precio": 15000,
  "cantidad": 70
}
```

### Ventas

```json
{
  "cliente": "Oscar Fernández",
  "fecha": "2026-06-01",
  "prenda": "Camisa Deportiva",
  "cantidad": 2,
  "total": 30000
}
```

---

## Integrantes

- Oscar Iván Fernández Chacón.
- Yadir Steven Rivera Espinoza.

---

## Profesor

- Daniel Bogarín Granados.
