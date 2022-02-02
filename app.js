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
    password: 'Admin*1234',
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
    query += " where dim_carro.sk_carro = fact_automoviles.sk_carro AND dim_revision.sk_revision = fact_automoviles.sk_revision";

    if (req.query.tipoVehiculo != undefined && req.query.tipoVehiculo != '')
        query += " AND tipo_vehiculo = '" + req.query.tipoVehiculo + "'";

    if (req.query.modelo != undefined && req.query.modelo != '')
        query += " AND  modelo_carro = '" + req.query.modelo + "'";

    if (req.query.marca != undefined && req.query.marca != '')
        query += " AND marca_carro = '" + req.query.marca + "'";

    if (req.query.tipoCombustible != undefined && req.query.tipoCombustible != '')
        query += " AND tipo_combustible = '" + req.query.tipoCombustible + "'";


    query += " order by pk_carro asc";

    console.log(query);
    console.log("Obteniendo data...");
    client.query(query, (err, result) => {

        if (err) return res.sendStatus(500);

        console.log("Data encontrada: " + result.rowCount);
        return res.json(result.rows);
    });

});

app.get('/api/modelos', function(req, res) {

    var query = 'select distinct modelo_carro, marca_carro from dim_carro ' +
        ' where modelo_carro is not null order by modelo_carro asc;';

    console.log("Obteniendo data...");
    client.query(query, (err, result) => {

        if (err) return res.sendStatus(500);

        console.log("Data encontrada: " + result.rowCount);
        return res.json(result.rows);
    });

});

app.get('/api/marcas', function(req, res) {

    var query = 'select distinct (marca_carro) from dim_carro ' +
        'where marca_carro is not null order by marca_carro asc;';

    console.log("Obteniendo data...");
    client.query(query, (err, result) => {

        if (err) return res.sendStatus(500);

        console.log("Data encontrada: " + result.rowCount);
        return res.json(result.rows);
    });

});

app.get('/api/tipo/vehiculos', function(req, res) {

    var query = 'select distinct (tipo_vehiculo) from dim_carro ' +
        'where tipo_vehiculo is not null order by tipo_vehiculo asc;';

    console.log("Obteniendo data...");
    client.query(query, (err, result) => {

        if (err) return res.sendStatus(500);

        console.log("Data encontrada: " + result.rowCount);
        return res.json(result.rows);
    });

});

app.get('/api/tipo/combustibles', function(req, res) {

    var query = 'select distinct (tipo_combustible) from dim_carro ' +
        'where tipo_combustible is not null order by tipo_combustible asc;';

    console.log("Obteniendo data...");
    client.query(query, (err, result) => {

        if (err) return res.sendStatus(500);

        console.log("Data encontrada: " + result.rowCount);
        return res.json(result.rows);
    });

});

app.post('/api/insertar_datos', function(req, res) {
    const userData = req.body;
    //consulta..

    let query = ` insert into fact_automoviles (sk_carro, sk_revision, sk_ventas, sk_concesionario,sk_fecha, kilometro, precio, potencia_ps, codigo_postal) values ('${userData.sk_carro}', '${userData.sk_revision}','${userData.sk_ventas}', '${userData.sk_concesionario}','${userData.sk_fecha}', '${userData.kilometro}','${userData.precio}', '${userData.potencia_ps}','${userData.codigo_postal}')`;



    client.query(query, (err, result) => {
        if (err) {
            return res.sendStatus(500);
        }
        if (result.rowCount == 0) {
            return res.sendStatus(500);
        }
        return res.json({
            code: 200,
            data: result.rows[0]
        })



    });

});

app.put('/api/actualizar_datos', function(req, res) {
    if (err) return res.sendStatus(500);
});

app.delete('/api/eliminar_datos', function(req, res) {
    if (err) return res.sendStatus(500);
});

app.get('/api/tabla_fact', function(req, res) {

    var query = 'select * from fact_automoviles;';

    console.log("Obteniendo data...");
    client.query(query, (err, result) => {

        if (err) return res.sendStatus(500);

        console.log("Data encontrada: " + result.rowCount);
        return res.json(result.rows);
    });

});

var sendError = function(err) {
    console.log("Error al obtener la data");
    console.log(err);
    return res.sendStatus(500);
}

app.listen(8000, () => {
    console.log('Escuchando en el puerto: ', 8000);
});