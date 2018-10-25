// Requires
var express = require('express');
var mongoose = require('mongoose');

// Conexión a la base de datos
mongoose.connection.openUri('mongodb://localhost:27017/nsmartagro', { useNewUrlParser: true }, (err, res) => {
    if (err) throw err;
    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'on line');
})

// Iniaializar variables
var app = express();

// Rutas


// Escuchar el peticiones
app.listen(3000, () => {
    console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m', 'on line');
});