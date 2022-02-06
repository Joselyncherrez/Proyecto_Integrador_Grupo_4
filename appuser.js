require('./config/config');

//Exportamos librerias
//libreria express
const express = require('express');
//libreria handelbars
const hbs = require('hbs');
//libreria cors
const cors = require('cors');
//libreria pg
const { Client } = require('pg');
//libreria body-parser
const bodyParser = require('body-parser');
//libreria de bcrypt
const bcrypt = require('bcrypt');
const async = require('hbs/lib/async');

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
    const queryUser = `select * from usuarios where usuario = '${userData.user}'`;
    client.query(queryUser, async(err, result) => {
        if (err) {
            return sendError(err);
        }
        if (result.rowCount == 0) {
            return res.json({
                code: 500,
                message: "El usuario ingresado no está registrado"
            })
        }
        const contra_desencriptada = await bcrypt.compare(userData.password, result.rows[0].contraseña);
        if (!contra_desencriptada) {
            return res.json({
                code: 503,
                message: "Contraseña incorrecta"
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
    //encriptacion
    const encriptacion = bcrypt.hashSync(userData.password, 12);
    let query = ` insert into usuarios (usuario, contraseña, rol) values ('${userData.user}', '${encriptacion}','USER_ROLE')`;

    client.query(query, (err, result) => {
        console.log(err);
        if (err) {
            return res.sendStatus(500);
        }
        if (result.rowCount == 0) {
            return res.sendStatus(500);
        }

        let consulta = `select * from usuarios where usuario = '${userData.user}' and contraseña = '${encriptacion}' `;
        client.query(consulta, (err, result) => {
            if (err) {
                return sendError(err);
            }
            if (result.rowCount == 0) {
                return res.json({
                    code: 500,
                    message: "El usuario ingresado no está registrado"
                })
            }
            return res.json({
                code: 200,
                data: result.rows[0]
            })
        });
        /*return res.json({
            code: 200,
            data: result.rows[0]
        })*/
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