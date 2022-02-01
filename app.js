require('./config/config');

//Exportamos librerias
const express = require('express');
const hbs = require('hbs');
const cors = require('cors');

//libreria pg
const { Client } = require('pg');
const bodyParser = require('body-parser');

//Crear el objeto app
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//Conexion a potsgres
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'Dimensional_Autos',
    password: '12345',
    port: 5432,
});

client.connect();

app.post('/api/login', function(req, res) {

    const userData = req.body;
    console.log(userData);
});


app.get('/api/carros', function(req, res) {

    console.info("query params:")
    console.info(req.query);

    var query = " Select dim_carro.*, kilometro, caja_cambios, precio from dim_carro, fact_automoviles, dim_revision";
    query += "where dim_carro.sk_carro = fact_automoviles.sk_carro  AND dim_revision.sk_revision = fact_automoviles.sk_revision";
    query += "inner join ventas on carro.id_carro = ventas.id_carro ";
    query += "AND 1=1";
    if (req.query.tipoVehiculo != undefined && req.query.tipoVehiculo != '')
        query += " AND tipo_vehiculo = '" + req.query.tipoVehiculo + "'";

    if (req.query.modelo != undefined && req.query.modelo != '')
        query += " AND  modelo = '" + req.query.modelo + "'";

    if (req.query.marca != undefined && req.query.marca != '')
        query += " AND marca = '" + req.query.marca + "'";

    if (req.query.tipoCombustible != undefined && req.query.tipoCombustible != '')
        query += " AND tipo_combustible = '" + req.query.tipoCombustible + "'";

    if (req.query.precio != undefined && req.query.precio != '')
        query += " AND precio = '" + req.query.precio + "'";

    if (req.query.tipoOferta != undefined && req.query.tipoOferta != '')
        query += " AND tipo_oferta = '" + req.query.tipoOferta + "'";

    query += " order by pk_carro asc";

    console.log(query);
    console.log("Obteniendo data...");
    client.query(query, (err, result) => {

        if (err) return sendError(err);

        console.log("Data encontrada: " + result.rowCount);
        return res.json(result.rows);
    });

});

app.get('/api/modelos', function(req, res) {

    var query = 'select distinct modelo_carro, marca_carro from dim_carro ' +
        ' where modelo_carro is not null order by modelo_carro asc;';

    console.log("Obteniendo data...");
    client.query(query, (err, result) => {

        if (err) return sendError(err);

        console.log("Data encontrada: " + result.rowCount);
        return res.json(result.rows);
    });

});

app.get('/api/marcas', function(req, res) {

    var query = 'select distinct (marca_carro) from dim_carro ' +
        'where marca_carro is not null order by marca_carro asc;';

    console.log("Obteniendo data...");
    client.query(query, (err, result) => {

        if (err) return sendError(err);

        console.log("Data encontrada: " + result.rowCount);
        return res.json(result.rows);
    });

});

app.get('/api/tipo/vehiculos', function(req, res) {

    var query = 'select distinct (tipo_vehiculo) from dim_carro ' +
        'where tipo_vehiculo is not null order by tipo_vehiculo asc;';

    console.log("Obteniendo data...");
    client.query(query, (err, result) => {

        if (err) return sendError(err);

        console.log("Data encontrada: " + result.rowCount);
        return res.json(result.rows);
    });

});

app.get('/api/tipo/combustibles', function(req, res) {

    var query = 'select distinct (tipo_combustible) from dim_carro ' +
        'where tipo_combustible is not null order by tipo_combustible asc;';

    console.log("Obteniendo data...");
    client.query(query, (err, result) => {

        if (err) return sendError(err);

        console.log("Data encontrada: " + result.rowCount);
        return res.json(result.rows);
    });

});

app.post('/api/insertar_datos', function(req, res) {
    if (err) return sendError(err);
});

app.put('/api/actualizar_datos', function(req, res) {
    if (err) return sendError(err);
});

app.delete('/api/eliminar_datos', function(req, res) {
    if (err) return sendError(err);
});

var sendError = function(err) {
    console.log("Error al obtener la data");
    console.log(err);
    return res.sendStatus(500);
};

app.listen(8000, () => {
    console.log('Escuchando en el puerto: ', 8000);
});