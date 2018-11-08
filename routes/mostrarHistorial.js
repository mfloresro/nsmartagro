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

//=====================================================================================
// Agregar valor índice
//=====================================================================================

app.get('/:lote', (req, res) => {
    var lote = req.params.lote;

    Lote.findById({ '_id': lote })
        .exec((err, lotes) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar índice: ' + indice,
                    errors: err
                });
            }

            if (!lotes) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El lote con el id ' + id + ' no existe',
                    errors: { message: 'No existe un lote con ese ID' }
                });
            }
            var arr = [];
            var y = [];

            arr = lotes.HistConductividad;
            //console.log(arr);
            if (arr.length < 10) {
                y = lotes.HistConductividad;
            } else {
                x = (arr.length) - 10;
                console.log('x', x);
                for (var i = x; i < x + 10; i += 1) {
                    y.push(arr[i]);
                }
            }
            lotes.HistConductividad = y;
            // arr = [];
            y = [];
            arr = lotes.HistTemperatura;
            if (arr.length < 10) {
                y = lotes.HistTemperatura = arr;
            } else {
                x = (arr.length) - 10;
                for (var i = x; i < x + 10; i += 1) {
                    y.push(arr[i]);
                }
            }
            lotes.HistTemperatura = y;

            y = [];
            arr = lotes.HistHumedad;
            if (arr.length < 10) {
                y = lotes.HistHumedad = arr;
            } else {
                x = (arr.length) - 10;
                for (var i = x; i < x + 10; i += 1) {
                    y.push(arr[i]);
                }
            }
            lotes.HistHumedad = y;

            y = [];
            arr = lotes.HistDispNutrientes;
            if (arr.length < 10) {
                y = lotes.HistDispNutrientes = arr;
            } else {
                x = (arr.length) - 10;
                for (var i = x; i < arr.length; i += 1) {
                    y.push(arr[i]);
                }
            }
            lotes.HistDispNutrientes = y;


            var y = [];
            arr = lotes.Hist_NDVI;
            if (arr.length < 10) {
                y = lotes.Hist_NDVI;
            } else {
                x = (arr.length) - 10;
                console.log('x', x);
                for (var i = x; i < x + 10; i += 1) {
                    y.push(arr[i]);
                }
            }
            lotes.Hist_NDVI = y;

            var y = [];
            arr = lotes.Hist_NDWI;
            if (arr.length < 10) {
                y = lotes.Hist_NDVI;
            } else {
                x = (arr.length) - 10;
                console.log('x', x);
                for (var i = x; i < x + 10; i += 1) {
                    y.push(arr[i]);
                }
            }
            lotes.Hist_NDWI = y;

            res.status(200).json({
                lotes
            });


            // lotes.save((err, LoteGuardado) => {
            //     if (err) {
            //         return res.status(400).json({
            //             ok: false,
            //             mensaje: 'Error al actualizar lote',
            //             errors: err
            //         });
            //     }
            //     res.status(200).json({
            //         lotes: 'Guardado'
            //     });

            // });



        });
});

module.exports = app;