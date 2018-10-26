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
        FechaSiembra: FechaSiembra
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


app.get('/:lote/:indice', (req, res) => {
    var lote = req.params.lote;
    var indice = req.params.indice;
    console.log(lote, indice);
    var inidiceValidos = ['Hist_NDVI', 'Hist_NDWI'];
    if (inidiceValidos.indexOf(indice) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Índice no válido',
            errors: { message: 'Los índices válidos son ' + inidiceValidos.join(', ') }
        });
    }

    Lote.find({}, '_id Hist_NDVI')
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

            return res.status(200).json({
                x: lotes
            });
        });

});
module.exports = app;