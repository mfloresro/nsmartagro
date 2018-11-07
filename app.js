// Requires
var express = require('express');
var mongoose = require('mongoose');

// Iniaializar variables
var app = express();

// Importar rutas
var appRoutes = require('./routes/app');
var loteRoutes = require('./routes/lote');
var guardarHistorial = require('./routes/guardarHistorial');
var mostrarHistorial = require('./routes/mostrarHistorial');

// Conexión a la base de datos
mongoose.connection.openUri('mongodb://mflores:itsg1982@ds141623.mlab.com:41623/nsmartagrodb', { useNewUrlParser: true }, (err, res) => {
    // mongoose.connection.openUri('mongodb://localhost:27017/nsmartagrodb', { useNewUrlParser: true }, (err, res) => {
    if (err) throw err;
    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'on line');
})

// Rutas
app.use('/lote', loteRoutes);
app.use('/guardarHistorial', guardarHistorial);
app.use('/mostrarHistorial', mostrarHistorial);


app.use('/', appRoutes);

// Escuchar el peticiones
//app.set('port', process.env.PORT || 3000);
var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Express server puerto: ' + port + ' \x1b[32m%s\x1b[0m', 'on line');
});