// ======================================================
// CONFIGURACIÓN
// ======================================================

const API_URL = "http://127.0.0.1:5000";

const TOKEN = "tienda123";

let prendaEditandoId = null;


// ======================================================
// FUNCIONES AUXILIARES
// ======================================================

function escaparHTML(valor) {

    return String(valor ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function formatearColones(valor) {

    return `₡${Number(valor || 0).toLocaleString("es-CR")}`;
}


function mostrarMensajeTabla(
    idTabla,
    columnas,
    mensaje,
    clase = "text-muted"
) {

    const tabla = document.getElementById(idTabla);

    if (!tabla) {
        return;
    }

    tabla.innerHTML = `

        <tr>

            <td
                colspan="${columnas}"
                class="text-center ${clase} py-4"
            >

                ${escaparHTML(mensaje)}

            </td>

        </tr>

    `;
}


// ======================================================
// CARGAR PRENDAS
// ======================================================

async function cargarPrendas() {

    try {

        const respuesta = await fetch(
            `${API_URL}/prendas`,
            {
                headers: {
                    "Authorization": `Bearer ${TOKEN}`
                }
            }
        );


        if (!respuesta.ok) {

            throw new Error(
                `Error HTTP: ${respuesta.status}`
            );

        }


        const prendas = await respuesta.json();


        const tabla =
            document.getElementById(
                "tablaPrendas"
            );


        tabla.innerHTML = "";


        if (
            !Array.isArray(prendas) ||
            prendas.length === 0
        ) {

            mostrarMensajeTabla(
                "tablaPrendas",
                6,
                "No existen prendas registradas."
            );

            return;
        }


        prendas.forEach(prenda => {

            const fila =
                document.createElement("tr");


            fila.dataset.id =
                prenda._id || "";


            fila.dataset.nombre =
                prenda.nombre || "";


            fila.dataset.marca =
                prenda.marca || "";


            fila.dataset.precio =
                prenda.precio || 0;


            fila.dataset.cantidad =
                prenda.cantidad || 0;


            fila.innerHTML = `

                <td class="id-cell">
                    ${escaparHTML(prenda._id)}
                </td>

                <td>
                    ${escaparHTML(prenda.nombre)}
                </td>

                <td>
                    ${escaparHTML(prenda.marca)}
                </td>

                <td>
                    ${formatearColones(prenda.precio)}
                </td>

                <td>
                    ${Number(
                        prenda.cantidad || 0
                    ).toLocaleString("es-CR")}
                </td>

                <td class="text-center">

                    <button
                        type="button"
                        class="btn btn-warning btn-sm
                               btn-editar-prenda me-1"
                        data-id="${escaparHTML(
                            prenda._id
                        )}"
                    >

                        <i class="bi bi-pencil-square"></i>

                        Editar

                    </button>


                    <button
                        type="button"
                        class="btn btn-danger btn-sm
                               btn-eliminar-prenda"
                        data-id="${escaparHTML(
                            prenda._id
                        )}"
                    >

                        <i class="bi bi-trash"></i>

                        Eliminar

                    </button>

                </td>

            `;


            tabla.appendChild(fila);

        });


    } catch (error) {

        console.error(
            "Error al cargar las prendas:",
            error
        );


        mostrarMensajeTabla(
            "tablaPrendas",
            6,
            "No se pudieron cargar las prendas.",
            "text-danger"
        );

    }

}


// ======================================================
// ABRIR MODAL PARA EDITAR
// ======================================================

function abrirEditarPrenda(id) {

    const filas =
        document.querySelectorAll(
            "#tablaPrendas tr"
        );


    let prenda = null;


    filas.forEach(fila => {

        if (
            fila.dataset &&
            fila.dataset.id === id
        ) {

            prenda = {

                id: id,

                nombre:
                    fila.dataset.nombre,

                marca:
                    fila.dataset.marca,

                precio:
                    fila.dataset.precio,

                cantidad:
                    fila.dataset.cantidad

            };

        }

    });


    if (!prenda) {

        alert(
            "No se encontró la prenda."
        );

        return;
    }


    prendaEditandoId =
        prenda.id;


    document.getElementById(
        "nombrePrenda"
    ).value = prenda.nombre;


    document.getElementById(
        "marcaPrenda"
    ).value = prenda.marca;


    document.getElementById(
        "precioPrenda"
    ).value = prenda.precio;


    document.getElementById(
        "cantidadPrenda"
    ).value = prenda.cantidad;


    document.getElementById(
        "tituloModalPrenda"
    ).textContent =
        "Editar prenda";


    document.getElementById(
        "btnGuardarPrenda"
    ).innerHTML =
        '<i class="bi bi-check-lg"></i> Guardar cambios';


    const modal =
        bootstrap.Modal.getOrCreateInstance(
            document.getElementById(
                "modalPrenda"
            )
        );


    modal.show();

}


// ======================================================
// PREPARAR MODAL PARA NUEVA PRENDA
// ======================================================

function prepararModalNuevaPrenda() {

    prendaEditandoId = null;


    document.getElementById(
        "formPrenda"
    ).reset();


    document.getElementById(
        "tituloModalPrenda"
    ).textContent =
        "Agregar prenda";


    document.getElementById(
        "btnGuardarPrenda"
    ).innerHTML =
        '<i class="bi bi-check-lg"></i> Guardar prenda';

}


// ======================================================
// CREAR O ACTUALIZAR PRENDA
// ======================================================

async function crearOActualizarPrenda() {

    const formulario =
        document.getElementById(
            "formPrenda"
        );


    if (!formulario.checkValidity()) {

        formulario.reportValidity();

        return;
    }


    const nombre =
        document.getElementById(
            "nombrePrenda"
        ).value.trim();


    const marca =
        document.getElementById(
            "marcaPrenda"
        ).value.trim();


    const precio =
        Number(
            document.getElementById(
                "precioPrenda"
            ).value
        );


    const cantidad =
        Number(
            document.getElementById(
                "cantidadPrenda"
            ).value
        );


    const prenda = {

        nombre: nombre,

        marca: marca,

        precio: precio,

        cantidad: cantidad

    };


    try {

        let respuesta;


        // ACTUALIZAR

        if (prendaEditandoId) {

            respuesta =
                await fetch(

                    `${API_URL}/prendas/${encodeURIComponent(
                        prendaEditandoId
                    )}`,

                    {

                        method: "PUT",

                        headers: {

                            "Content-Type":
                                "application/json",

                            "Authorization":
                                `Bearer ${TOKEN}`

                        },

                        body:
                            JSON.stringify(
                                prenda
                            )

                    }

                );

        }


        // CREAR

        else {

            respuesta =
                await fetch(

                    `${API_URL}/prendas`,

                    {

                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json",

                            "Authorization":
                                `Bearer ${TOKEN}`

                        },

                        body:
                            JSON.stringify(
                                prenda
                            )

                    }

                );

        }


        const resultado =
            await respuesta.json();


        if (!respuesta.ok) {

            throw new Error(

                resultado.mensaje ||
                "Error al guardar la prenda."

            );

        }


        if (prendaEditandoId) {

            alert(
                "Prenda actualizada correctamente."
            );

        }

        else {

            alert(
                "Prenda creada correctamente."
            );

        }


        document.getElementById(
            "formPrenda"
        ).reset();


        prendaEditandoId = null;


        document.getElementById(
            "tituloModalPrenda"
        ).textContent =
            "Agregar prenda";


        document.getElementById(
            "btnGuardarPrenda"
        ).innerHTML =
            '<i class="bi bi-check-lg"></i> Guardar prenda';


        const modal =
            bootstrap.Modal.getInstance(
                document.getElementById(
                    "modalPrenda"
                )
            );


        if (modal) {

            modal.hide();

        }


        await cargarPrendas();

        await cargarMarcasVentas();

        await cargarInventario();

        await cargarTopMarcas();


    } catch (error) {

        console.error(
            "Error al guardar la prenda:",
            error
        );


        alert(error.message);

    }

}


// ======================================================
// ELIMINAR PRENDA
// ======================================================

async function eliminarPrenda(id) {

    const confirmar =
        confirm(
            "¿Está seguro de que desea eliminar esta prenda?"
        );


    if (!confirmar) {

        return;

    }


    try {

        const respuesta =
            await fetch(

                `${API_URL}/prendas/${encodeURIComponent(id)}`,

                {

                    method: "DELETE",

                    headers: {

                        "Authorization":
                            `Bearer ${TOKEN}`

                    }

                }

            );


        const resultado =
            await respuesta.json();


        if (!respuesta.ok) {

            throw new Error(

                resultado.mensaje ||
                "Error al eliminar la prenda."

            );

        }


        alert(
            "Prenda eliminada correctamente."
        );


        await cargarPrendas();

        await cargarMarcasVentas();

        await cargarInventario();

        await cargarTopMarcas();


    } catch (error) {

        console.error(
            "Error al eliminar la prenda:",
            error
        );


        alert(error.message);

    }

}


// ======================================================
// CARGAR VENTAS
// ======================================================

async function cargarVentas() {

    try {

        const respuesta =
            await fetch(
                `${API_URL}/ventas`
            );


        if (!respuesta.ok) {

            throw new Error(
                `Error HTTP: ${respuesta.status}`
            );

        }


        const ventas =
            await respuesta.json();


        const tabla =
            document.getElementById(
                "tablaVentas"
            );


        tabla.innerHTML = "";


        if (
            !Array.isArray(ventas) ||
            ventas.length === 0
        ) {

            mostrarMensajeTabla(
                "tablaVentas",
                6,
                "No existen ventas registradas."
            );

            return;

        }


        ventas.forEach(venta => {

            const fila =
                document.createElement("tr");


            fila.innerHTML = `

                <td class="id-cell">
                    ${escaparHTML(venta._id)}
                </td>

                <td>
                    ${escaparHTML(venta.cliente)}
                </td>

                <td>
                    ${escaparHTML(venta.prenda)}
                </td>

                <td>
                    ${Number(
                        venta.cantidad || 0
                    ).toLocaleString("es-CR")}
                </td>

                <td>
                    ${formatearColones(
                        venta.total
                    )}
                </td>

                <td>
                    ${escaparHTML(venta.fecha)}
                </td>

            `;


            tabla.appendChild(fila);

        });


    } catch (error) {

        console.error(
            "Error al cargar las ventas:",
            error
        );


        mostrarMensajeTabla(
            "tablaVentas",
            6,
            "No se pudieron cargar las ventas.",
            "text-danger"
        );

    }

}


// ======================================================
// CARGAR USUARIOS
// ======================================================

async function cargarUsuarios() {

    try {

        const respuesta =
            await fetch(
                `${API_URL}/usuarios`
            );


        if (!respuesta.ok) {

            throw new Error(
                `Error HTTP: ${respuesta.status}`
            );

        }


        const usuarios =
            await respuesta.json();


        const tabla =
            document.getElementById(
                "tablaUsuarios"
            );


        tabla.innerHTML = "";


        if (
            !Array.isArray(usuarios) ||
            usuarios.length === 0
        ) {

            mostrarMensajeTabla(
                "tablaUsuarios",
                4,
                "No existen usuarios registrados."
            );

            return;

        }


        usuarios.forEach(usuario => {

            const fila =
                document.createElement("tr");


            fila.innerHTML = `

                <td class="id-cell">
                    ${escaparHTML(usuario._id)}
                </td>

                <td>
                    ${escaparHTML(usuario.nombre)}
                </td>

                <td>
                    ${escaparHTML(usuario.correo)}
                </td>

                <td>
                    ${escaparHTML(usuario.telefono)}
                </td>

            `;


            tabla.appendChild(fila);

        });


    } catch (error) {

        console.error(
            "Error al cargar los usuarios:",
            error
        );


        mostrarMensajeTabla(
            "tablaUsuarios",
            4,
            "No se pudieron cargar los usuarios.",
            "text-danger"
        );

    }

}


// ======================================================
// MARCAS CON VENTAS
// ======================================================

async function cargarMarcasVentas() {

    try {

        const [
            respuestaVentas,
            respuestaPrendas
        ] = await Promise.all([

            fetch(
                `${API_URL}/ventas`
            ),

            fetch(
                `${API_URL}/prendas`,
                {
                    headers: {
                        "Authorization":
                            `Bearer ${TOKEN}`
                    }
                }
            )

        ]);


        if (
            !respuestaVentas.ok ||
            !respuestaPrendas.ok
        ) {

            throw new Error(
                "No se pudieron obtener los datos."
            );

        }


        const ventas =
            await respuestaVentas.json();


        const prendas =
            await respuestaPrendas.json();


        const tabla =
            document.getElementById(
                "tablaMarcasVentas"
            );


        tabla.innerHTML = "";


        const marcas = {};


        ventas.forEach(venta => {

            const prenda =
                prendas.find(

                    item =>
                        item.nombre ===
                        venta.prenda

                );


            if (!prenda) {

                return;

            }


            const marca =
                prenda.marca;


            if (!marcas[marca]) {

                marcas[marca] = 0;

            }


            marcas[marca] +=
                Number(
                    venta.cantidad || 0
                );

        });


        const nombresMarcas =
            Object.keys(marcas);


        if (
            nombresMarcas.length === 0
        ) {

            mostrarMensajeTabla(
                "tablaMarcasVentas",
                2,
                "No existen marcas con ventas registradas."
            );

            return;

        }


        nombresMarcas

            .sort(
                (a, b) =>
                    marcas[b] - marcas[a]
            )

            .forEach(
                (marca, index) => {

                    const fila =
                        document.createElement(
                            "tr"
                        );


                    fila.innerHTML = `

                        <td>

                            <span
                                class="badge text-bg-primary me-2"
                            >
                                ${index + 1}
                            </span>

                            ${escaparHTML(marca)}

                        </td>


                        <td>

                            ${marcas[
                                marca
                            ].toLocaleString(
                                "es-CR"
                            )}

                        </td>

                    `;


                    tabla.appendChild(
                        fila
                    );

                }
            );


    } catch (error) {

        console.error(
            "Error al cargar marcas con ventas:",
            error
        );


        mostrarMensajeTabla(
            "tablaMarcasVentas",
            2,
            "No se pudieron cargar las marcas con ventas.",
            "text-danger"
        );

    }

}


// ======================================================
// REPORTE DE INVENTARIO
// ======================================================

async function cargarInventario() {

    try {

        const respuesta =
            await fetch(
                `${API_URL}/reportes/inventario`
            );


        if (!respuesta.ok) {

            throw new Error(
                `Error HTTP: ${respuesta.status}`
            );

        }


        const datos =
            await respuesta.json();


        const tabla =
            document.getElementById(
                "tablaInventario"
            );


        tabla.innerHTML = "";


        if (
            !Array.isArray(datos) ||
            datos.length === 0
        ) {

            mostrarMensajeTabla(
                "tablaInventario",
                3,
                "No hay datos de inventario."
            );

            return;

        }


        datos.forEach(item => {

            const fila =
                document.createElement("tr");


            const stock =
                Number(
                    item.stockRestante || 0
                );


            let claseStock =
                "text-bg-success";


            if (stock <= 5) {

                claseStock =
                    "text-bg-danger";

            }

            else if (stock <= 15) {

                claseStock =
                    "text-bg-warning";

            }


            fila.innerHTML = `

                <td>
                    ${escaparHTML(
                        item.prenda
                    )}
                </td>


                <td>

                    ${Number(
                        item.cantidadVendida || 0
                    ).toLocaleString("es-CR")}

                </td>


                <td>

                    <span
                        class="badge ${claseStock}"
                    >

                        ${stock.toLocaleString(
                            "es-CR"
                        )}

                    </span>

                </td>

            `;


            tabla.appendChild(
                fila
            );

        });


    } catch (error) {

        console.error(
            "Error al cargar inventario:",
            error
        );


        mostrarMensajeTabla(
            "tablaInventario",
            3,
            "No se pudo cargar el inventario.",
            "text-danger"
        );

    }

}


// ======================================================
// TOP 5 MARCAS
// ======================================================

async function cargarTopMarcas() {

    try {

        const respuesta =
            await fetch(
                `${API_URL}/reportes/top-marcas`
            );


        if (!respuesta.ok) {

            throw new Error(
                `Error HTTP: ${respuesta.status}`
            );

        }


        const datos =
            await respuesta.json();


        const tabla =
            document.getElementById(
                "tablaTopMarcas"
            );


        tabla.innerHTML = "";


        if (
            !Array.isArray(datos) ||
            datos.length === 0
        ) {

            mostrarMensajeTabla(
                "tablaTopMarcas",
                3,
                "No existen datos de ventas."
            );

            return;

        }


        datos.forEach(
            (marca, indice) => {

                const fila =
                    document.createElement(
                        "tr"
                    );


                fila.innerHTML = `

                    <td>

                        <span
                            class="badge text-bg-primary"
                        >

                            ${indice + 1}

                        </span>

                    </td>


                    <td>

                        ${escaparHTML(
                            marca._id
                        )}

                    </td>


                    <td>

                        ${Number(
                            marca.totalVentas || 0
                        ).toLocaleString(
                            "es-CR"
                        )}

                    </td>

                `;


                tabla.appendChild(
                    fila
                );

            }
        );


    } catch (error) {

        console.error(
            "Error al cargar top de marcas:",
            error
        );


        mostrarMensajeTabla(
            "tablaTopMarcas",
            3,
            "No se pudo cargar el top de marcas.",
            "text-danger"
        );

    }

}


// ======================================================
// REPORTE DE VENTAS POR FECHA
// ======================================================

async function consultarVentasPorFecha() {

    const fecha =
        document.getElementById(
            "fechaReporte"
        ).value;


    const resultado =
        document.getElementById(
            "resultadoVentasFecha"
        );


    if (!fecha) {

        resultado.innerHTML = `

            <div
                class="alert alert-warning mb-0"
            >

                <i
                    class="bi bi-exclamation-triangle"
                ></i>

                Seleccione una fecha
                antes de consultar.

            </div>

        `;

        return;

    }


    resultado.innerHTML = `

        <div class="text-center py-3">

            <span
                class="spinner-border spinner-border-sm me-2"
            ></span>

            Consultando ventas...

        </div>

    `;


    try {

        const respuesta =
            await fetch(

                `${API_URL}/reportes/ventas-fecha/${encodeURIComponent(
                    fecha
                )}`

            );


        if (!respuesta.ok) {

            throw new Error(
                `Error HTTP: ${respuesta.status}`
            );

        }


        const datos =
            await respuesta.json();


        if (
            !Array.isArray(datos) ||
            datos.length === 0
        ) {

            resultado.innerHTML = `

                <div
                    class="alert alert-info mb-0"
                >

                    <i
                        class="bi bi-info-circle"
                    ></i>

                    No se registraron ventas
                    para la fecha

                    <strong>
                        ${escaparHTML(fecha)}
                    </strong>.

                </div>

            `;

            return;

        }


        const totalVendido =
            datos.reduce(

                (total, item) =>

                    total +
                    Number(
                        item.totalVendido || 0
                    ),

                0

            );


        resultado.innerHTML = `

            <div class="row g-3">


                <div class="col-md-6">

                    <div
                        class="report-summary"
                    >

                        <span
                            class="report-summary-icon"
                        >

                            <i
                                class="bi bi-calendar-check"
                            ></i>

                        </span>


                        <div>

                            <small
                                class="text-muted d-block"
                            >

                                Fecha consultada

                            </small>


                            <strong>

                                ${escaparHTML(fecha)}

                            </strong>

                        </div>

                    </div>

                </div>



                <div class="col-md-6">

                    <div
                        class="report-summary"
                    >

                        <span
                            class="report-summary-icon"
                        >

                            <i
                                class="bi bi-cart-check"
                            ></i>

                        </span>


                        <div>

                            <small
                                class="text-muted d-block"
                            >

                                Prendas vendidas

                            </small>


                            <strong>

                                ${totalVendido.toLocaleString(
                                    "es-CR"
                                )}

                            </strong>

                        </div>

                    </div>

                </div>


            </div>

        `;


    } catch (error) {

        console.error(
            "Error al consultar ventas por fecha:",
            error
        );


        resultado.innerHTML = `

            <div
                class="alert alert-danger mb-0"
            >

                <i
                    class="bi bi-x-circle"
                ></i>

                No se pudo consultar
                el reporte de ventas.

            </div>

        `;

    }

}


// ======================================================
// ACTUALIZAR REPORTES
// ======================================================

async function actualizarReportes() {

    const boton =
        document.getElementById(
            "btnActualizarReportes"
        );


    boton.disabled = true;


    boton.innerHTML = `

        <span
            class="spinner-border spinner-border-sm me-2"
        ></span>

        Actualizando...

    `;


    try {

        await Promise.all([

            cargarMarcasVentas(),

            cargarInventario(),

            cargarTopMarcas()

        ]);

    }


    finally {

        boton.disabled = false;


        boton.innerHTML = `

            <i
                class="bi bi-arrow-clockwise"
            ></i>

            Actualizar reportes

        `;

    }

}


// ======================================================
// INICIAR SISTEMA
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {


        // -----------------------------------------------
        // CARGAR DATOS INICIALES
        // -----------------------------------------------

        cargarPrendas();

        cargarVentas();

        cargarUsuarios();

        cargarMarcasVentas();

        cargarInventario();

        cargarTopMarcas();



        // -----------------------------------------------
        // FORMULARIO DE PRENDAS
        // -----------------------------------------------

        document
            .getElementById(
                "formPrenda"
            )
            .addEventListener(
                "submit",
                event => {

                    event.preventDefault();

                    crearOActualizarPrenda();

                }
            );



        // -----------------------------------------------
        // NUEVA PRENDA
        // -----------------------------------------------

        document
            .getElementById(
                "btnNuevaPrenda"
            )
            .addEventListener(
                "click",
                prepararModalNuevaPrenda
            );



        // -----------------------------------------------
        // BOTONES DE PRENDAS
        // -----------------------------------------------

        document
            .getElementById(
                "tablaPrendas"
            )
            .addEventListener(
                "click",
                event => {


                    const botonEditar =
                        event.target.closest(
                            ".btn-editar-prenda"
                        );


                    const botonEliminar =
                        event.target.closest(
                            ".btn-eliminar-prenda"
                        );


                    if (botonEditar) {

                        abrirEditarPrenda(
                            botonEditar.dataset.id
                        );

                    }


                    if (botonEliminar) {

                        eliminarPrenda(
                            botonEliminar.dataset.id
                        );

                    }

                }
            );



        // -----------------------------------------------
        // ACTUALIZAR VENTAS
        // -----------------------------------------------

        document
            .getElementById(
                "btnActualizarVentas"
            )
            .addEventListener(
                "click",
                cargarVentas
            );



        // -----------------------------------------------
        // ACTUALIZAR USUARIOS
        // -----------------------------------------------

        document
            .getElementById(
                "btnActualizarUsuarios"
            )
            .addEventListener(
                "click",
                cargarUsuarios
            );



        // -----------------------------------------------
        // ACTUALIZAR REPORTES
        // -----------------------------------------------

        document
            .getElementById(
                "btnActualizarReportes"
            )
            .addEventListener(
                "click",
                actualizarReportes
            );



        // -----------------------------------------------
        // CONSULTAR VENTAS POR FECHA
        // -----------------------------------------------

        document
            .getElementById(
                "btnConsultarFecha"
            )
            .addEventListener(
                "click",
                consultarVentasPorFecha
            );


    }
);