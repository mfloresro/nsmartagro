var express = require('express');
var fileUpload = require('express-fileupload');
var fs = require('fs');

var app = express();
// Modelos
var Usuario = require('../models/usuario');
var Medico = require('../models/medico');
var Hospital = require('../models/hospital');

// default options
app.use(fileUpload());


app.put('/:tipo/:id', (req, res) => {
    var tipo = req.params.tipo;
    var id = req.params.id;

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No selecciono nada',
            errors: { message: 'Debe seleccionar una imagen' }
        });
    }


    //=====================================================================================
    // obterner el nombre del archivo
    //=====================================================================================
    var archivo = req.files.imagen;
    var nombreCortado = archivo.name.split('.');
    var extensionArchivo = nombreCortado[nombreCortado.length - 1];
    // Solo estas secciones aceptamos
    var extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

    // Tipos de colección
    var tiposValidos = ['hospitales', 'medicos', 'usuarios'];
    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Tipo de colección no válida',
            errors: { message: 'Las colecciones válidas son ' + tiposValidos.join(', ') }
        });
    }

    if (extensionesValidas.indexOf(extensionArchivo) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Extension no valida',
            errors: { message: 'Las extensiones validas son ' + extensionesValidas.join(', ') }
        });
    }

    // Nombre del archivo personalido
    var nombreArchivo = `${id}-${ new Date().getMilliseconds()}.${extensionArchivo}`;

    // Mover el archivo del temporal a un path
    var path = `./uploads/${tipo}/${nombreArchivo}`;
    archivo.mv(path, err => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al mover archivo',
                errors: err
            });
        }
        subirPorTipo(tipo, id, nombreArchivo, res);
    });

});


function subirPorTipo(tipo, id, nombreArchivo, res) {

    if (tipo === 'usuarios') {
        Usuario.findById(id, (err, usuario) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar usuario',
                    errors: err
                });
            }

            if (!usuario) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El usuario con el id ' + id + ' no existe',
                    errors: { message: 'No existe un usuario con ese ID' }
                });
            }


            // es conveniente validar en caso de algun error
            var pathViejo = './uploads/usuarios/' + usuario.img;
            // si existe elimina el path anterior
            if (fs.existsSync(pathViejo)) {
                fs.unlink(pathViejo);
            }

            usuario.img = nombreArchivo;
            usuario.save((err, usuarioActualizado) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error al buscar usuario',
                        errors: err
                    });
                }

                if (!usuarioActualizado) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'El usuario con el id ' + id + ' no existe',
                        errors: { message: 'No existe un usuario con ese ID' }
                    });
                }
                usuarioActualizado.password = ':)';
                return res.status(200).json({
                    ok: true,
                    mensaje: 'Imagen de usuario actualizada ',
                    usuario: usuarioActualizado
                });

            })
        });
    }

    if (tipo === 'medicos') {
        Medico.findById(id, (err, medico) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar médico',
                    errors: err
                });
            }

            if (!medico) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El médico con el id ' + id + ' no existe',
                    errors: { message: 'No existe un médico con ese ID' }
                });
            }


            // es conveniente validar en caso de algun error
            var pathViejo = './uploads/medicos/' + medico.img;
            // si existe elimina el path anterior
            if (fs.existsSync(pathViejo)) {
                fs.unlink(pathViejo);
            }

            medico.img = nombreArchivo;
            medico.save((err, medicoActualizado) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error al guardar médico',
                        errors: err
                    });
                }

                if (!medicoActualizado) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'El médico con el id ' + id + ' no existe',
                        errors: { message: 'No existe un médico con ese ID' }
                    });
                }
                return res.status(200).json({
                    ok: true,
                    mensaje: 'Imagen de médico actualizada ',
                    medico: medicoActualizado
                });

            })
        });
    }

    if (tipo === 'hospitales') {
        Hospital.findById(id, (err, hospital) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar hospital',
                    errors: err
                });
            }

            if (!hospital) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El hospital con el id ' + id + ' no existe',
                    errors: { message: 'No existe un hospital con ese ID' }
                });
            }


            // es conveniente validar en caso de algun error
            var pathViejo = './uploads/hospitales/' + hospital.img;
            // si existe elimina el path anterior
            if (fs.existsSync(pathViejo)) {
                fs.unlink(pathViejo);
            }

            hospital.img = nombreArchivo;
            hospital.save((err, hospitalActualizado) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error al buscar hospital',
                        errors: err
                    });
                }

                if (!hospitalActualizado) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'El hospital con el id ' + id + ' no existe',
                        errors: { message: 'No existe un hospital con ese ID' }
                    });
                }
                return res.status(200).json({
                    ok: true,
                    mensaje: 'Imagen de hospital actualizada ',
                    hospital: hospitalActualizado
                });

            })
        });
    }

}

module.exports = app;