'use strict';

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Anuncio = mongoose.model('Anuncio');

// Módulo de gestión de errores
var errores = require('../../lib/apiv1/errores.js');

// Módulo para el procesamiento de queries
var procesaQS = require('../../lib/apiv1/procesaQueryString.js');

// Autenticación con JWT
var jwtAuth = require('../../lib/apiv2/jwtAuth');
router.use(jwtAuth());

router.get('/images/:imagen', function(req, res) {

  // Recuperación del parámetro de idioma
  //var idioma = req.params.idiom;
  var idioma = req.headers['idioma'];

  var options = {
    root: __dirname + '/../../public/images',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true,
    },
  };

  res.sendFile(req.params.imagen, options, function(err) {
    console.log('Anuncios.js - Imagen enviada con éxito');
    if (err) {
      errores('IMAGE_GET_ERROR', idioma, err, res);
    }
  });
});

router.get('/listaTags', function(req, res) {

  // Recuperación del parámetro de idioma
  //var idioma = req.params.idiom;
  var idioma = req.headers['idioma'];

  // Ejecución de la consulta
  Anuncio.listaTags().then(function(data) {
    console.log('Anuncios.js - Tags listados con éxito');
    res.json({tags: data});

  }).catch(function(err) {
    errores('TAGS_LIST_ERROR', idioma, err, res);
  });

});

router.get('/listaAnuncios', function(req, res) {

  // Recuperación del parámetro de idioma
  //var idioma = req.params.idiom;
  var idioma = req.headers['idioma'];

  // Recuperación de los parámetros del query string y procesamiento
  procesaQS(req.query.tag, req.query.venta, req.query.nombre, req.query.precio)
      .then(function(criterios) {

        // Configuración de los parámetros de paginación y ordenación
        var skip = 0;
        var limit = 0;
        var sort = '';
        if (req.query.start) {
          skip = req.query.start;
        }
        if (req.query.limit) {
          limit = req.query.limit;
        }
        if (req.query.sort) {
          sort = req.query.sort;
        }

        // Ejecución de la consulta
        Anuncio.lista(criterios, skip, limit, sort).then(function(data) {
          console.log('Anuncios.js - Lista de anuncios:', data);
          res.json({anuncios: data});

        }).catch(function(err) {
          errores('ANUNCIOS_LIST_ERROR', idioma, err, res);
        });
      }).catch(function(err) {
        errores(err.msg, idioma, err, res);
      });
});

module.exports = router;
