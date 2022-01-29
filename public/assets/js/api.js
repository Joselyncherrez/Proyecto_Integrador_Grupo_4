const server = "localhost:8000";

function obtenerMarcas() {
    const options = {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }

    return fetch(`${server}/api/marcas`, options)
        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                $('#marcas').append($('<option>', {
                    value: element.marca,
                    text: element.marca
                }));
            });
        })
        .catch(error => console.error(error));

}

function obtenerModelos() {

    $.get("/api/modelos", function(data) {
            data.forEach(element => {
                $('#modelos').append($('<option>', {
                    value: element.modelo,
                    text: element.modelo
                }));
            });
        })
        .fail(function(err) {
            console.log(err);
        })
}

function obtenerTiposVehiculos() {

    $.get("/api/tipo/vehiculos", function(data) {
            data.forEach(element => {
                $('#tiposVehiculos').append($('<option>', {
                    value: element.tipo_vehiculo,
                    text: element.tipo_vehiculo
                }));
            });
        })
        .fail(function(err) {
            console.log(err);
        })
}

function obtenerTiposCombustibles() {

    $.get("/api/tipo/combustibles", function(data) {
            data.forEach(element => {
                $('#tiposCombustibles').append($('<option>', {
                    value: element.tipo_combustible,
                    text: element.tipo_combustible
                }));
            });
        })
        .fail(function(err) {
            console.log(err);
        })
}

function obtenerPrecios() {

    $.get("/api/precios", function(data) {
            data.forEach(element => {
                $('#precios').append($('<option>', {
                    value: element.precio,
                    text: element.precio
                }));
            });
        })
        .fail(function(err) {
            console.log(err);
        })
}

function obtenerTiposOfertas() {

    $.get("/api/tipo/ofertas", function(data) {
            data.forEach(element => {
                $('#tiposOfertas').append($('<option>', {
                    value: element.tipo_oferta,
                    text: element.tipo_oferta
                }));
            });
        })
        .fail(function(err) {
            console.log(err);
        })
}

function filtrarCarros() {

    //Oculta la gráfica
    $("#container").css({ display: "none" });

    $.get("/api/carros", {
            marca: $("#marcas").val(),
            modelo: $("#modelos").val(),
            tipoVehiculo: $("#tiposVehiculos").val(),
            tipoCombustible: $("#tiposCombustibles").val(),
            precio: $("#precios").val(),
            tipoOferta: $("#tiposOfertas").val()
        }, function(data) {

            var map = new Map();
            //Limpio la tabla
            $('#carros tr').not(':first').remove();
            var html = '';
            //Verifica que si haya data
            if (data.length != 0) {
                data.forEach(element => {
                    html += '' +
                        '<tr>' +
                        '<td>' + element.id_carro + '</td>' +
                        '<td>' + element.marca + '</td>' +
                        '<td>' + element.modelo + '</td>' +
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