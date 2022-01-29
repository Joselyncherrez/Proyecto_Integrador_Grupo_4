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