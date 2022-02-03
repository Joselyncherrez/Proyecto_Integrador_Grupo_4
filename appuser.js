require('./config/config');

//Exportamos librerias
const express = require('express');
const hbs = require('hbs');
const cors = require('cors');

//libreria pg
const { Client } = require('pg');
const bodyParser = require('body-parser');
const { query } = require('express');

//Crear el objeto app
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//Conexion a potsgres
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'Usuarios',
    password: 'Admin*1234',
    port: 5432,
});

client.connect();

app.post('/api/login', function(req, res) {

    const userData = req.body;
    //consulta..
    let query = `select * from usuarios where usuario = '${userData.user}' and contraseña = '${userData.password}' `;


    client.query(query, (err, result) => {
        if (err) {
            return sendError(err);
        }
        if (result.rowCount == 0) {
            return res.json({
                code: 500,
                message: "Usuario no existe"
            })

        }
        return res.json({
            code: 200,
            data: result.rows[0]
        })



    });
});

app.post('/api/registrar', function(req, res) {

    const userData = req.body;
    //consulta..
    let query = ` insert into usuarios (usuario, contraseña, rol) values ('${userData.user}', '${userData.password}','USER_ROLE')`;



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




var sendError = function(err) {
    console.log("Error al obtener la data");
    console.log(err);
    return res.sendStatus(500);
};

app.listen(9000, () => {
    console.log('Escuchando en el puerto: ', 9000);
});