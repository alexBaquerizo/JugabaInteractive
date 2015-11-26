var express = require('express');
var router = express.Router();

var autorController = require('../controllers/autor_controller');
var sessionController = require('../controllers/session_controller');
var userController = require('../controllers/user_controller');
var alumnoController = require('../controllers/alumno_controller');
var cuestionarioController = require('../controllers/cuestionario_controller');//para listado de cuestionario
var profesorController = require('../controllers/profesor_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Jugaba Interactive Web', errors: [] });
});

//Rutas de sesion
router.get('/login', sessionController.new);
router.post('/login', sessionController.create);
router.get('/logout', sessionController.destroy);

router.get('/autores', autorController.list); // Ruta del listado de autores

router.get('/miPerfil', sessionController.loginRequired, 	userController.miPerfil);
router.put('/users',              sessionController.loginRequired, 	userController.updateMiPerfil);

module.exports = router;
