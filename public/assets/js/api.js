function obtenerMarcas(userData = {}) {
    const server = "http://localhost:8000";
    const options = {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }


    /*const options = {
        method: 'POST',
        body: userData,
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }
*/

    $.ajax(`${server}/api/marcas`, options, function(data) {
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


//document.getElementById('inputPassword').value == 'ciclo59' && document.getElementById('inputEmail').value == 'usuario1'

function obtenerModelos() {
    const server = "http://localhost:8000";
    const options = {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }

    $.ajax(`${server}/api/modelos`, options, function(data) {
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
    const server = "http://localhost:8000";
    const options = {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }

    $.ajax(`${server}/api/tipo/vehiculos`, options, function(data) {
            data.forEach(element => {
                $('#tiposVehiculos').append($('<option>', {
                    value: element.modelo,
                    text: element.modelo
                }));
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

    $.ajax(`${server}/api/tipo/combustibles`, options, function(data) {
            data.forEach(element => {
                $('#tiposCombustibles').append($('<option>', {
                    value: element.modelo,
                    text: element.modelo
                }));
            });
        })
        .fail(function(err) {
            console.log(err);
        })
}

function obtenerPrecios() {
    const server = "http://localhost:8000";
    const options = {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }

    $.ajax(`${server}/api/precios`, options, function(data) {
            data.forEach(element => {
                $('#precios').append($('<option>', {
                    value: element.modelo,
                    text: element.modelo
                }));
            });
        })
        .fail(function(err) {
            console.log(err);
        })

}

function obtenerTiposOfertas() {
    const server = "http://localhost:8000";
    const options = {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }

    $.ajax(`${server}/api/tipo/ofertas`, options, function(data) {
            data.forEach(element => {
                $('#tiposOfertas').append($('<option>', {
                    value: element.modelo,
                    text: element.modelo
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

    const server = "http://localhost:8000";
    const options = {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }

    $.ajax(`${server}/api/carros`, options, function(data), {
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