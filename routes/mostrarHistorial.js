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

app.get('/:lote/:indice', (req, res) => {
    var lote = req.params.lote;
    var indice = req.params.indice;

    var inidiceValidos = ['HistConductividad', 'HistTemperatura', 'HistHumedad', 'HistDispNutrientes'];

    if (inidiceValidos.indexOf(indice) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Índice no válido',
            errors: { message: 'Los índices válidos son ' + inidiceValidos.join(', ') }
        });
    }

    if (inidiceValidos.indexOf(indice) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Índice no válido',
            errors: { message: 'Los índices válidos son ' + inidiceValidos.join(', ') }
        });
    }

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

            switch (indice) {
                case 'HistConductividad':
                    arr = lotes.HistConductividad;
                    if (arr.length - 1 < 10) {
                        y = lotes.HistConductividad;
                    } else {
                        x = arr[(arr.length - 1) - 10]
                        for (var i = x; i < arr.length; i += 1) {
                            y.push(arr[i]);
                        }
                        lotes.HistConductividad = y;
                    }
                    break;

                case 'HistTemperatura':
                    arr = lotes.HistTemperatura;
                    if (arr.length - 1 < 10) {
                        y = lotes.HistTemperatura = arr;
                    } else {
                        x = arr[(arr.length - 1) - 10]
                        for (var i = x; i < arr.length; i += 1) {
                            y.push(arr[i]);
                        }
                        lotes.HistTemperatura = y;
                    }
                    break;

                case 'HistHumedad':
                    arr = lotes.HistHumedad;
                    if (arr.length - 1 < 10) {
                        y = lotes.HistHumedad = arr;
                    } else {
                        x = arr[(arr.length - 1) - 10]
                        for (var i = x; i < arr.length; i += 1) {
                            y.push(arr[i]);
                        }
                        lotes.HistHumedad = y;
                    }
                    break;

                case 'HistDispNutrientes':
                    arr = lotes.HistDispNutrientes;
                    if (arr.length - 1 < 10) {
                        y = lotes.HistDispNutrientes = arr;
                    } else {
                        x = arr[(arr.length - 1) - 10]
                        for (var i = x; i < arr.length; i += 1) {
                            y.push(arr[i]);
                        }
                        lotes.HistDispNutrientes = y;
                    }
                    break;
                default:
                    break;
            }


            res.status(200).json({
                lotes: y
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