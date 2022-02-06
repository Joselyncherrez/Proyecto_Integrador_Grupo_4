function obtenerMarcas(userData = {}) {
    const server = "http://localhost:8000";
    const options = {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }
    $.ajax(`${server}/api/marcas`, options, function(data) {})
        .done((data) => {
            data.forEach(element => {
                $('#marcas').append(`<option value="${element.marca_carro}">${element.marca_carro}</option>`);
            });
        })
        .fail(function(err) {

            console.log(err);
        })
}

function obtenerModelos() {
    const server = "http://localhost:8000";
    const options = {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }

    $("#marcas").on('change', function(e) {
        let marca = this.value;

        $.ajax(`${server}/api/modelos`, options, function(data) {})
            .done((data) => {
                $('#modelos').find('option').remove()
                $('#modelos').append('<option value="">Seleccionar modelo</option>')
                const filterData = data.filter((element) => {
                    return element.marca_carro == marca;
                })
                filterData.forEach(element => {
                    $('#modelos').append(`<option value="${element.modelo_carro}">${element.modelo_carro}</option>`);
                });
            })
            .fail(function(err) {
                console.log(err);
            })
    })


}

function obtenerTiposVehiculos() {
    const server = "http://localhost:8000";
    const options = {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }

    $.ajax(`${server}/api/tipo/vehiculos`, options, function(data) {})
        .done((data) => {
            data.forEach(element => {
                $('#tiposVehiculos').append(`<option value="${element.tipo_vehiculo}">${element.tipo_vehiculo}</option>`);
            });
        })
        .fail(function(err) {
            console.log(err);
        })
}

function obtenerTiposCombustibles() {
    const server = "http://localhost:8000";
    const options = {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }

    $.ajax(`${server}/api/tipo/combustibles`, options, function(data) {})
        .done((data) => {
            data.forEach(element => {
                $('#tiposCombustibles').append(`<option value="${element.tipo_combustible}">${element.tipo_combustible}</option>`);
            });
        })
        .fail(function(err) {
            console.log(err);
        })
}

let offset = 0;
let page = 0;
const limit = 10;

/*function addpaginasvista() {
    if (page != 0) {
        offset = offset + limit;
    }
    page++;
    filtrarCarros(limit, offset)
}

function respaginasvista() {
    offset = offset - limit;
    page--;
    if (offset <= 0) {
        offset = 0;
        page = 0;
    }
    filtrarCarros(limit, offset)
}*/

function filtrarCarros(limit, offset) {

    //Oculta la gráfica
    $("#container").css({ display: "none" });

    const server = "http://localhost:8000";
    const options = {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }
    const values = {
        marca: $("#marcas").val(),
        modelo: $("#modelos").val(),
        tipoVehiculo: $("#tiposVehiculos").val(),
        tipoCombustible: $("#tiposCombustibles").val(),
    }

    $.ajax(`${server}/api/carros?marca=${values.marca}&modelo=${values.modelo}&tipoVehiculo=${values.tipoVehiculo}&tipoCombustible=${values.tipoCombustible}`, options, function()

            {}

        )
        .done(data => {
            var map = new Map();
            //Limpio la tabla
            $('#carros tr').not(':first').remove();
            var html = '';
            //Verifica que si haya data
            if (data.length != 0) {
                data.forEach(element => {
                    html += '' +
                        '<tr>' +
                        '<td>' + element.pk_carro + '</td>' +
                        '<td>' + element.marca_carro + '</td>' +
                        '<td>' + element.modelo_carro + '</td>' +
                        '<td>' + element.tipo_vehiculo + '</td>' +
                        '<td>' + element.tipo_combustible + '</td>' +
                        '<td>' + element.kilometro + '</td>' +
                        '<td>' + element.caja_cambios + '</td>' +
                        '</tr>';
                    if (map.has(element.tipo_vehiculo)) {
                        var arreglo = map.get(element.tipo_vehiculo);
                        arreglo.push(element.precio);

                        var set = new Set(arreglo);
                        map.set(element.tipo_vehiculo, Array.from(set));
                    } else {
                        var arreglo = [element.precio];
                        map.set(element.tipo_vehiculo, arreglo);
                    }
                });
            } else {
                html += '<tr>' +
                    '<td colspan="7" class="text-center"> No se encontraron registros </td>' +

                    '</tr>';
            }

            //Se crea los registros
            $('#carros tr').first().after(html);
            //Grafica
            //Metodos de highcharts.js
            graficar(map);
        })
        .fail(function(err) {
            console.log(err);
        })
}

function addpaginas() {
    if (page != 0) {
        offset = offset + limit;
    }
    page++;
    mostrar_tabla(limit, offset)
}

function respaginas() {
    offset = offset - limit;
    page--;
    if (offset <= 0) {
        offset = 0;
        page = 0;
    }
    mostrar_tabla(limit, offset)
}

function mostrar_tabla(limit, offset) {
    const server = "http://localhost:8000";
    const options = {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }
    $.ajax(`${server}/api/tabla_fact?limit=${limit}&offset=${offset}`, options, function()

            {}

        )
        .done(data => {
            $('#fact tr').not(':first').remove();
            var html = '';
            //Verifica que si haya data
            if (data.length != 0) {
                data.forEach(element => {
                    html += '' +
                        '<tr>' +
                        '<td>' + element.sk_carro + '</td>' +
                        '<td>' + element.sk_revision + '</td>' +
                        '<td>' + element.sk_ventas + '</td>' +
                        '<td>' + element.sk_concesionario + '</td>' +
                        '<td>' + element.sk_fecha + '</td>' +
                        '<td>' + element.kilometro + '</td>' +
                        '<td>' + element.precio + '</td>' +
                        '<td>' + element.potencia_ps + '</td>' +
                        '<td>' + element.codigo_postal + '</td>' +
                        '</tr>';
                });
            } else {
                html += '<tr>' +
                    '<td colspan="7" class="text-center"> No se encontraron registros </td>' +

                    '</tr>';
            }

            //Se crea los registros
            $('#fact tr').first().after(html);
        })
        .fail(function(err) {
            debugger;
            console.log(err);
        })
}

function insertar_registros() {
    const server = "http://localhost:8000";
    userData = {
        sk_carro: document.getElementById('inputSkCarro').value,
        sk_revision: document.getElementById('inputSkRevision').value,
        sk_ventas: document.getElementById('inputSkVentas').value,
        sk_concesionario: document.getElementById('inputSkConcesionario').value,
        sk_fecha: document.getElementById('inputSkFecha').value,
        kilometro: document.getElementById('inputKilometro').value,
        precio: document.getElementById('inputPrecio').value,
        potencia_ps: document.getElementById('inputPotenciaPs').value,
        codigo_postal: document.getElementById('inputCodigoPostal').value
    }
    const options = {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }

    return fetch(`${server}/api/insertar_datos`, options)
        .then(response => response.json())
        .then(data => {
            alert('Registro insertado');
            $('#inputSkCarro').val(String(" "));
            $('#inputSkRevision').val(String(" "));
            $('#inputSkVentas').val(String(" "));
            $('#inputSkConcesionario').val(String(" "));
            $('#inputSkFecha').val(String(" "));
            $('#inputKilometro').val(String(" "));
            $('#inputPrecio').val(String(" "));
            $('#inputPotenciaPs').val(String(" "));
            $('#inputCodigoPostal').val(String(" "));
        })
        .catch(error => console.error(error));

}

function eliminar_registros() {
    const server = "http://localhost:8000";
    userData = {
        sk_carro: document.getElementById('inputSkCarro').value,
    }
    const options = {
        method: 'DELETE',
        body: JSON.stringify(userData),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }

    return fetch(`${server}/api/eliminar_datos`, options)
        .then(response => response.json())
        .then(element => {
            if (element.code == '404') {
                return alert("No se encontró ese sk_carro en la base de datos");
            }
            alert('Registro eliminado');
            $('#inputSkCarro').val(String(" "));
        })
        .catch(error => console.error(error));

}

function buscar_registros() {
    const server = "http://localhost:8000";
    const userData = {
        sk_carro: document.getElementById('inputSkCarro').value,
        sk_revision: document.getElementById('inputSkRevision').value,
        sk_ventas: document.getElementById('inputSkVentas').value,
        sk_concesionario: document.getElementById('inputSkConcesionario').value,
        sk_fecha: document.getElementById('inputSkFecha').value,
        kilometro: document.getElementById('inputKilometro').value,
        precio: document.getElementById('inputPrecio').value,
        potencia_ps: document.getElementById('inputPotenciaPs').value,
        codigo_postal: document.getElementById('inputCodigoPostal').value
    }
    const options = {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }

    return fetch(`${server}/api/buscar_datos`, options)
        .then(response => response.json())
        .then(element => {
            if (element.code == '404') {
                return alert("No se encontraron datos");
            }

            $('#inputSkRevision').val(String(element.data.sk_revision));
            $('#inputSkVentas').val(String(element.data.sk_ventas));
            $('#inputSkConcesionario').val(String(element.data.sk_concesionario));
            $('#inputSkFecha').val(String(element.data.sk_fecha));
            $('#inputKilometro').val(String(element.data.kilometro));
            $('#inputPrecio').val(String(element.data.precio));
            $('#inputPotenciaPs').val(String(element.data.potencia_ps));
            $('#inputCodigoPostal').val(String(element.data.codigo_postal));

            $('#inputSkCarro').prop('disabled', true);
            $('#inputSkRevision').prop('disabled', true);
            $('#inputSkVentas').prop('disabled', true);
            $('#inputSkConcesionario').prop('disabled', true);
            $('#inputSkFecha').prop('disabled', true);
            $('#inputKilometro').prop('disabled', true);
            $('#inputPrecio').prop('disabled', true);
            $('#inputPotenciaPs').prop('disabled', true);
            $('#inputCodigoPostal').prop('disabled', true);
        })
        .catch(error => console.error(error));
}

function actualizar_registros() {
    const server = "http://localhost:8000";
    userData = {
        sk_carro: document.getElementById('inputSkCarro').value,
        sk_revision: document.getElementById('inputSkRevision').value,
        sk_ventas: document.getElementById('inputSkVentas').value,
        sk_concesionario: document.getElementById('inputSkConcesionario').value,
        sk_fecha: document.getElementById('inputSkFecha').value,
        kilometro: document.getElementById('inputKilometro').value,
        precio: document.getElementById('inputPrecio').value,
        potencia_ps: document.getElementById('inputPotenciaPs').value,
        codigo_postal: document.getElementById('inputCodigoPostal').value,

        kilometroA: document.getElementById('inputKilometroA').value,
        precioA: document.getElementById('inputPrecioA').value,
        potencia_psA: document.getElementById('inputPotenciaPsA').value,
        codigo_postalA: document.getElementById('inputCodigoPostalA').value
    }
    const options = {
        method: 'PUT',
        body: JSON.stringify(userData),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }

    return fetch(`${server}/api/actualizar_datos`, options)
        .then(response => response.json())
        .then(data => {
            alert('Registro actualizado');
            $('#inputSkCarro').prop('disabled', false);
            $('#inputSkRevision').prop('disabled', false);
            $('#inputSkVentas').prop('disabled', false);
            $('#inputSkConcesionario').prop('disabled', false);
            $('#inputSkFecha').prop('disabled', false);
            $('#inputKilometro').prop('disabled', false);
            $('#inputPrecio').prop('disabled', false);
            $('#inputPotenciaPs').prop('disabled', false);
            $('#inputCodigoPostal').prop('disabled', false);

            $('#inputSkCarro').val(String(" "));
            $('#inputSkRevision').val(String(" "));
            $('#inputSkVentas').val(String(" "));
            $('#inputSkConcesionario').val(String(" "));
            $('#inputSkFecha').val(String(" "));
            $('#inputKilometro').val(String(" "));
            $('#inputPrecio').val(String(" "));
            $('#inputPotenciaPs').val(String(" "));
            $('#inputCodigoPostal').val(String(" "));

            $('#inputKilometroA').val(String(" "));
            $('#inputPrecioA').val(String(" "));
            $('#inputPotenciaPsA').val(String(" "));
            $('#inputCodigoPostalA').val(String(" "));
        })
        .catch(error => console.error(error));

}