var mongoose = require('mongoose');
var Shcema = mongoose.Schema;

var loteShema = new Shcema({
    lote: String,
    NomLote: String,
    NomCultivo: String,
    VarCul: String,
    FechaSiembra: String,
    EtapaFen: String,
    HorCalor: String,
    URL_MapNDVI: String,
    Hist_NDVI: [Number],
    lertas_PlagEnf: String,
    DemAgua_m3: String,
    DemAgua_Total: String,
    LamRiegoReq: String,
    URL_MapNDWI: String,
    Hist_NDWI: [Number],
    Alertas_Hidricas: String,
    HistConductividad: [Number],
    HistTemperatura: [Number],
    HistHumedad: [Number],
    HistDispNutrientes: [Number],
    Alertas_Sustrato: String
});

module.exports = mongoose.model('Lote', loteShema);