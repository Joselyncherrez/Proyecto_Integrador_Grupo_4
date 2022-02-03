function graficar(map) {
    //mostrar grafica
    $("#container").css({ display: "block" });
    Highcharts.chart('container', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Precios de los tipos de vehículos'
        },
        xAxis: {
            type: 'category',
            min: 0,
            labels: {
                animate: true
            }
        },
        yAxis: {
            title: {
                text: 'Precios($)'
            }
        },
        series: [{
            zoneAxis: 'x',

            dataLabels: {
                enabled: true,
                format: '{y:,.2f}'
            },
            dataSorting: {
                enabled: true,
                sortKey: 'y'
            },
            data: getChartData(map)
        }]
    });
}




function getChartData(map) {

    var data = [];
    for (const [key, value] of map.entries()) {
        var price = 0;
        if (value.length != 0) {
            price = value[0];
        }
        data.push([key, price]);
    }

    return data;
}