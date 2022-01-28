require('./config/config');

//Exportamos librerias
const express = require('express');
const hbs = require('hbs');
//libreria pg
const { Client } = require('pg');

//Crear el objeto app
const app = express();

app.use(express.static(__dirname + '/public/assets'));

hbs.registerPartials(__dirname + '/views/parciales');

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/vista_report', (req, res) => {
    res.render('vista_report');
});

app.get('/administrador', (req, res) => {
    res.render('administrador');
});

app.get('/registrarse', (req, res) => {
    res.render('registrarse');
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando en el puerto: ', process.env.PORT);
});


//Conexion a potsgres
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'Relacional_Autos',
    password: '12345',
    port: 5432,
});

client.connect();

//obtener datos
app.get('/api/carros', function(req, res) {

    console.info("query params:")
    console.info(req.query);

    var query = "select carro.*, revision.kilometro, revision.caja_cambios, ventas.precio from carro ";
    query += "inner join revision on carro.id_carro = revision.id_carro ";
    query += "inner join ventas on carro.id_carro = ventas.id_carro ";
    query += "where 1 = 1";
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

    query += " ORDER BY id_carro ASC";

    console.log(query);
    console.log("Obteniendo data...");
    client.query(query, (err, result) => {

        if (err) return sendError(err);

        console.log("Data encontrada: " + result.rowCount);
        return res.json(result.rows);
    });

});

app.get('/api/modelos', function(req, res) {

    var query = 'select distinct(modelo) from carro ' +
        ' where modelo is not null order by modelo asc';

    console.log("Obteniendo data...");
    client.query(query, (err, result) => {

        if (err) return sendError(err);

        console.log("Data encontrada: " + result.rowCount);
        return res.json(result.rows);
    });

});


app.get('/api/marcas', function(req, res) {

    var query = 'select distinct(marca) from carro ' +
        'where marca is not null order by marca asc';

    console.log("Obteniendo data...");
    client.query(query, (err, result) => {

        if (err) return sendError(err);

        console.log("Data encontrada: " + result.rowCount);
        return res.json(result.rows);
    });

});

app.get('/api/tipo/vehiculos', function(req, res) {

    var query = 'select distinct(tipo_vehiculo) from ' +
        'carro where tipo_vehiculo is not null order by tipo_vehiculo asc';

    console.log("Obteniendo data...");
    client.query(query, (err, result) => {

        if (err) return sendError(err);

        console.log("Data encontrada: " + result.rowCount);
        return res.json(result.rows);
    });

});


app.get('/api/tipo/combustibles', function(req, res) {

    var query = 'select distinct(tipo_combustible)' +
        'from carro where tipo_combustible is not null order by tipo_combustible asc';

    console.log("Obteniendo data...");
    client.query(query, (err, result) => {

        if (err) return sendError(err);

        console.log("Data encontrada: " + result.rowCount);
        return res.json(result.rows);
    });

});

app.get('/api/precios', function(req, res) {

    var query = 'select distinct(precio) from ventas ' +
        'where precio is not null order by precio asc';

    console.log("Obteniendo data...");
    client.query(query, (err, result) => {

        if (err) return sendError(err);

        console.log("Data encontrada: " + result.rowCount);
        return res.json(result.rows);
    });

});

app.get('/api/tipo/ofertas', function(req, res) {

    var query = 'select distinct(tipo_oferta) from ventas ' +
        'where tipo_oferta is not null order by tipo_oferta asc';

    console.log("Obteniendo data...");
    client.query(query, (err, result) => {

        if (err) return sendError(err);

        console.log("Data encontrada: " + result.rowCount);
        return res.json(result.rows);
    });

});