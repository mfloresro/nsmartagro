var express = require('express');
var app = express();

var Lote = require('../models/lote');


app.get('/', (req, res, next) => {

    Lote.find({}, (err, lotes) => {
        if (err) {
            return res.status(500).json({

                mensaje: 'Error cargando Usuarios',
                errors: err
            });
        }

        res.status(200).json({
            lotes: lotes
        });

    });

});


app.get('/consultaLote', (req, res) => {
    Lote.find({}, '_id NomLote')
        .exec(
            (err, lotes) => {
                if (err) {
                    return res.status(500).json({

                        mensaje: 'Error cargando Usuarios',
                        errors: err
                    });
                }
                res.status(200).json({
                    lotes: lotes
                });

            });
});



app.get('/:guardarLote/:NomLote/:NomCultivo/:VarCul/:FechaSiembra', (req, res) => {
    var NomLote = req.params.NomLote;
    var NomCultivo = req.params.NomCultivo;
    var VarCul = req.params.VarCul;
    var FechaSiembra = req.params.FechaSiembra;

    var lote = new Lote({
        NomLote: NomLote,
        NomCultivo: NomCultivo,
        VarCul: VarCul,
        FechaSiembra: FechaSiembra,
        Hist_NDWI: 0,
        Hist_NDVI: 0,
    });

    lote.save((err, LoteGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al guardar lote',
                errors: err
            });
        }

        res.status(201).json({
            lote: LoteGuardado
        });
    });


});

app.get('/:lote/:indices', (req, res) => {
    var lote = req.params.lote;
    var indice = req.params.indice;


    Lote.find({ '_id': lote }, 'Hist_NDVI')

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
        console.log('lotes --> ', lotes);
        return res.status(200).json({
            lotes: lotes
        });
    });
});

//=====================================================================================
// Agregar valor índice
//=====================================================================================
app.get('/:lote/:indice/:valor', (req, res) => {
    var lote = req.params.lote;
    var indice = req.params.indice;
    var valor = req.params.valor;

    var inidiceValidos = ['Hist_NDVI', 'Hist_NDWI', 'HistConductividad', 'HistTemperatura', 'HistHumedad', 'HistDispNutrientes'];

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
            console.log(indice);
            switch (indice) {
                case 'Hist_NDVI':
                    arr = lotes.Hist_NDVI;
                    arr.push(valor);
                    lotes.Hist_NDVI = arr;
                    break;
                case 'Hist_NDWI':
                    arr = lotes.Hist_NDWI;
                    arr.push(valor);
                    lotes.Hist_NDWI = arr;
                    break;
                case 'HistConductividad':
                    arr = lotes.HistConductividad;
                    arr.push(valor);
                    lotes.HistConductividad = arr;
                    break;
                case 'HistTemperatura':
                    arr = lotes.HistTemperatura;
                    arr.push(valor);
                    lotes.HistTemperatura = arr;
                    break;
                case 'HistHumedad':
                    arr = lotes.HistHumedad;
                    arr.push(valor);
                    lotes.HistHumedad = arr;
                    break;
                case 'HistDispNutrientes':
                    arr = lotes.HistDispNutrientes;
                    arr.push(valor);
                    lotes.HistDispNutrientes = arr;
                    break;
                default:
                    break;

            }
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


// ===========================================================================
//
// ===========================================================================

// app.get('/indices/:lote/', (req, res) => {
//     var lote = req.params.lote;

//     Lote.find({ '_id': lote }, 'Hist_NDVI Hist_NDWI HistConductividad HistTemperatura HistHumedad HistDispNutrientes')
//         .exec((err, lotes) => {
//             if (err) {
//                 return res.status(500).json({
//                     ok: false,
//                     mensaje: 'Error al buscar índice: ' + indice,
//                     errors: err
//                 });
//             }

//             if (!lotes) {
//                 return res.status(400).json({
//                     ok: false,
//                     mensaje: 'El lote con el id ' + id + ' no existe',
//                     errors: { message: 'No existe un lote con ese ID' }
//                 });
//             }

//             return res.status(200).json({
//                 lotes: lotes
//             });
//         });
// });




module.exports = app;