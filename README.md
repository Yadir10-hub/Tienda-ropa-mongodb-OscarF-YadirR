# Tienda de Ropa MongoDB

## Descripción del Proyecto

Este proyecto consiste en el diseño e implementación de una base de datos NoSQL utilizando MongoDB para la gestión de una tienda de ropa.

La base de datos permite administrar información relacionada con:

- Usuarios
- Marcas
- Prendas
- Ventas

Además, se implementan operaciones CRUD (Crear, Leer, Actualizar y Eliminar) y consultas de agregación para el análisis de ventas e inventario.

---

## Objetivos

- Aplicar conceptos de bases de datos NoSQL.
- Utilizar MongoDB para la gestión de información.
- Implementar operaciones CRUD sobre múltiples colecciones.
- Realizar consultas de agregación para obtener información relevante del negocio.
- Utilizar GitHub para el control de versiones y trabajo colaborativo.

---

## Tecnologías Utilizadas

- MongoDB Atlas
- MongoDB Compass
- JavaScript
- GitHub
- Markdown

---

## Estructura del Proyecto

```text
/database
│
├── tienda.js
README.md
```

---

## Colecciones Implementadas

### Usuarios

Almacena la información de los clientes de la tienda.
#### Ejemplo
```json
{
  "nombre": "Yadir Rivera",
  "correo": "yadir9090@gmail.com",
  "telefono": "89878789"
}
```

### Marcas

Almacena las marcas de ropa disponibles.

#### Ejemplo
```json
{
"nombre": "Nike",
"país": "Costa Rica"
}
```

### Prendas

Almacena los productos disponibles para la venta.

#### Ejemplo
```json
{
  "nombre": "Camisa Deportiva",
  "marca": "Nike",
  "precio": 15000,
  "cantidad": 70
}
```


### Ventas

Registra las transacciones realizadas por los clientes.

#### Ejemplo
```json
{
  "fecha": "2026-06-01",
  "prenda": "Camiseta Deportiva",
  "cantidad": 3,
  "total": 45000
}
```


---

## Consultas Realizadas

### 1. Cantidad vendida de prendas por fecha

Obtiene la cantidad total de prendas vendidas para una fecha específica.

### 2. Marcas con al menos una venta

Obtiene la lista de marcas que registran ventas.

### 3. Prendas vendidas y stock restante

Muestra la cantidad vendida de cada prenda y el inventario disponible.

### 4. Top 5 marcas más vendidas

Obtiene las marcas con mayor cantidad de ventas registradas.

---

## Integrantes

- Oscar Iván Fernández Chacón.
- Yadir Steven Rivera Espinoza.

---

## Profesor

- Daniel Bogarín Granados