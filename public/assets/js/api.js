function obtenerMarcas(userData = {}) {
    const server = "http://localhost:8000";
    const options = {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }
    $.ajax(`${server}/api/marcas`, options, function(data) {


        })
        .done((data) => {
            data.forEach(element => {

                $('#marcas').append(`<option value="${element.marca}">${element.marca}</option>`);
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

    $("#marcas").on('change', function(e) {
        let marca = this.value;

        $.ajax(`${server}/api/modelos`, options, function(data) {


            })
            .done((data) => {
                $('#modelos').find('option').remove()
                $('#modelos').append('<option value="">Seleccionar modelo</option>')
                const filterData = data.filter((element) => {
                    return element.marca == marca;
                })

                filterData.forEach(element => {

                    $('#modelos').append(`<option value="${element.modelo}">${element.modelo}</option>`);
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

    $.ajax(`${server}/api/tipo/vehiculos`, options, function(data) {

        })
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

    $.ajax(`${server}/api/tipo/combustibles`, options, function(data) {

        })
        .done((data) => {
            data.forEach(element => {

                $('#tiposCombustibles').append(`<option value="${element.tipo_combustible}">${element.tipo_combustible}</option>`);
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
    const values = {
        marca: $("#marcas").val(),
        modelo: $("#modelos").val(),
        tipoVehiculo: $("#tiposVehiculos").val(),
        tipoCombustible: $("#tiposCombustibles").val(),

    }

    $.ajax(`${server}/api/carros?}marca=${values.marca}&modelo=${values.modelo}&tipoVehiculo=${values.tipoVehiculo}&tipoCombustible=${values.tipoCombustible}`, options, function()

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
            debugger;
            console.log(err);
        })
}