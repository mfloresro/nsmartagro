var express = require('express');
var app = express();
var Lote = require('../models/lote');

// Ruta Principal
app.get('/', (req, res, next) => {
    res.status(200).json({
        ok: true,
        mensaje: 'Petición realizada correctamente'
    });
});


app.get('/:lote/:HistConductividad/:HistTemperatura/:HistHumedad/:HistDispNutrientes', (req, res) => {
    var lote = req.params.lote;
    var conductividad = req.params.HistConductividad;
    var temperatura = req.params.HistTemperatura;
    var humedad = req.params.HistHumedad;
    var nutrientes = req.params.HistDispNutrientes;

    Lote.findById({ '_id': lote })
        .exec((err, lotes) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar índice: ' + lote,
                    errors: err
                });
            }

            if (!lotes) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El lote con el id ' + lote + ' no existe',
                    errors: { message: 'No existe un lote con ese ID' }
                });
            }

            var arrConductividad = [];
            arrConductividad = lotes.HistConductividad;
            arrConductividad.push(conductividad);
            lotes.HistConductividad = arrConductividad;

            var arrTemperatura = [];
            arrTemperatura = lotes.HistTemperatura;
            arrTemperatura.push(temperatura);
            lotes.HistTemperatura = arrTemperatura;


            var arrHumedad = [];
            arrHumedad = lotes.HistHumedad;
            arrHumedad.push(humedad);
            lotes.HistHumedad = arrHumedad;

            var arrNutrientes = [];
            arrNutrientes = lotes.HistDispNutrientes;
            arrNutrientes.push(nutrientes);
            lotes.HistDispNutrientes = arrNutrientes;

            lotes.save((err, LoteGuardado) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al actualizar lote',
                        errors: err
                    });
                }

                res.status(200).json({
                    lotes: 'Guardado'
                });

            });
        });
});



module.exports = app;