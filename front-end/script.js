const API_URL = "http://127.0.0.1:5000";
const TOKEN = "tienda123";
let prendaEditandoId = null;

async function cargarPrendas() {

try {

    const respuesta = await fetch(`${API_URL}/prendas`, {
        headers: {
            "Authorization": `Bearer ${TOKEN}`
        }
    });

    if (!respuesta.ok) {
        throw new Error(`Error HTTP: ${respuesta.status}`);
    }

    const prendas = await respuesta.json();

    const tabla = document.getElementById("tablaPrendas");

    tabla.innerHTML = "";

    prendas.forEach(prenda => {

        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${prenda._id || ""}</td>
            <td>${prenda.nombre || ""}</td>
            <td>${prenda.marca || ""}</td>
            <td>₡${prenda.precio || 0}</td>
            <td>${prenda.cantidad || 0}</td>
            <td>
                <button
                    class="btn btn-warning btn-sm"
                    onclick="abrirEditarPrenda('${prenda._id}')"
                >
                    Editar
                </button>

                <button
                    class="btn btn-danger btn-sm"
                    onclick="eliminarPrenda('${prenda._id}')"
                >
                    Eliminar
                </button>
            </td>
        `;

        tabla.appendChild(fila);
    });

} catch (error) {

    console.error("Error al cargar las prendas:", error);

    const tabla = document.getElementById("tablaPrendas");

    tabla.innerHTML = `
        <tr>
            <td colspan="6" class="text-center text-danger">
                No se pudieron cargar las prendas.
            </td>
        </tr>
    `;
}

}

function abrirEditarPrenda(id) {

const filas = document.querySelectorAll("#tablaPrendas tr");

let prenda = null;

filas.forEach(fila => {

    if (fila.innerHTML.includes(id)) {

        const celdas = fila.querySelectorAll("td");

        prenda = {
            _id: id,
            nombre: celdas[1].textContent,
            marca: celdas[2].textContent,
            precio: celdas[3].textContent.replace("₡", ""),
            cantidad: celdas[4].textContent
        };
    }
});

if (!prenda) {
    alert("No se encontró la prenda.");
    return;
}

prendaEditandoId = prenda._id;

document.getElementById("nombrePrenda").value = prenda.nombre;
document.getElementById("marcaPrenda").value = prenda.marca;
document.getElementById("precioPrenda").value = prenda.precio;
document.getElementById("cantidadPrenda").value = prenda.cantidad;

document.querySelector("#modalPrenda .modal-title").textContent =
    "Editar prenda";

document.getElementById("btnGuardarPrenda").textContent =
    "Guardar cambios";

const modal = new bootstrap.Modal(
    document.getElementById("modalPrenda")
);

modal.show();

}

async function crearPrenda() {

const nombre = document.getElementById("nombrePrenda").value;
const marca = document.getElementById("marcaPrenda").value;
const precio = Number(document.getElementById("precioPrenda").value);
const cantidad = Number(document.getElementById("cantidadPrenda").value);

const prenda = {
    nombre: nombre,
    marca: marca,
    precio: precio,
    cantidad: cantidad
};

try {

    let respuesta;

    if (prendaEditandoId) {

        // ACTUALIZAR PRENDA
        respuesta = await fetch(
            `${API_URL}/prendas/${prendaEditandoId}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${TOKEN}`
                },

                body: JSON.stringify(prenda)
            }
        );

    } else {

        // CREAR PRENDA
        respuesta = await fetch(`${API_URL}/prendas`, {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${TOKEN}`
            },

            body: JSON.stringify(prenda)
        });
    }

    const resultado = await respuesta.json();

    if (!respuesta.ok) {
        throw new Error(
            resultado.mensaje || "Error al guardar la prenda"
        );
    }

    if (prendaEditandoId) {
        alert("Prenda actualizada correctamente");
    } else {
        alert("Prenda creada correctamente");
    }

    document.getElementById("formPrenda").reset();

    prendaEditandoId = null;

    document.querySelector("#modalPrenda .modal-title").textContent =
        "Agregar prenda";

    document.getElementById("btnGuardarPrenda").textContent =
        "Guardar prenda";

    const modal = bootstrap.Modal.getInstance(
        document.getElementById("modalPrenda")
    );

    modal.hide();

    cargarPrendas();

} catch (error) {

    console.error("Error al guardar la prenda:", error);

    alert(error.message);
}

}

async function eliminarPrenda(id) {

const confirmar = confirm(
    "¿Está seguro de que desea eliminar esta prenda?"
);

if (!confirmar) {
    return;
}

try {

    const respuesta = await fetch(
        `${API_URL}/prendas/${id}`,
        {
            method: "DELETE",

            headers: {
                "Authorization": `Bearer ${TOKEN}`
            }
        }
    );

    const resultado = await respuesta.json();

    if (!respuesta.ok) {
        throw new Error(
            resultado.mensaje || "Error al eliminar la prenda"
        );
    }

    alert("Prenda eliminada correctamente");

    cargarPrendas();

} catch (error) {

    console.error("Error al eliminar la prenda:", error);

    alert(error.message);
}

}

document.addEventListener("DOMContentLoaded", () => {

    cargarPrendas();

    document
        .getElementById("btnGuardarPrenda")
        .addEventListener("click", crearPrenda);

});