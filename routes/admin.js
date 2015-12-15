var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var autorController = require('../controllers/autor_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

/* Listado - Alex Baquerizo Jimenez */

var cuestionarioController = require('../controllers/cuestionario_controller');//para listado de cuestionario
var observacionController = require('../controllers/observacion_controller');


var userController = require('../controllers/user_controller');
var profesorController = require('../controllers/profesor_controller');

var alumnoController = require('../controllers/alumno_controller');
var grupoController = require('../controllers/grupo_controller');
var materiaController = require('../controllers/materia_controller');

var novedadesController = require('../controllers/novedades_controller');

// Autoload de comandos
router.param('alumnoId', alumnoController.load);//autoload :userId
router.param('comentId',commentController.load); //autoload :commentId
router.param('cuestionarioId', cuestionarioController.load);//autoload :cuestionarioId
router.param('grupoId', grupoController.load); //autoload :grupoId
router.param('materiaId', materiaController.load);//autoload :materiaId
router.param('observacionId', observacionController.load);//autoload :observacionId
router.param('profesorId', profesorController.load);//autoload :profesorId
router.param('quizId',quizController.load); //autoload :quizId
router.param('userId', userController.load);//autoload :userId

router.param('novedadesId', novedadesController.load);//autoload :novedadesId

//Novedades

//Alumnos
router.get('/alumnos', 							sessionController.adminRequired, 	alumnoController.index); 
router.get('/alumnos/new', 						sessionController.adminRequired, 	alumnoController.new);
router.post('/alumnos/create', 					sessionController.adminRequired, 	alumnoController.create);
router.get('/alumnos/:alumnoId(\\d+)/edit',     sessionController.adminRequired, 	alumnoController.edit);
router.put('/alumnos/:alumnoId(\\d+)',          sessionController.adminRequired, 	alumnoController.update);
router.delete('/alumnos/:alumnoId(\\d+)', 		sessionController.adminRequired, 	alumnoController.destroy);

//Comments
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:comentId(\\d+)/publish', sessionController.loginRequired, commentController.publish);

//Cuestionarios
router.get('/cuestionarios',sessionController.loginRequired, cuestionarioController.index);//ruta de listado de cuestionarios
router.get('/cuestionarios/:cuestionarioId(\\d+)/edit', sessionController.loginRequired, cuestionarioController.edit);
router.put('/cuestionarios/:cuestionarioId(\\d+)', sessionController.loginRequired, cuestionarioController.update);
router.delete('/cuestionarios/:cuestionarioId(\\d+)', sessionController.loginRequired, cuestionarioController.destroy);
router.get('/cuestionarios/new',sessionController.loginRequired, cuestionarioController.new);
router.post('/cuestionarios/create', sessionController.loginRequired, cuestionarioController.create);

//Grupos
router.get('/grupos', 							sessionController.adminRequired,	grupoController.index);
router.get('/grupos/:grupoId(\\d+)', 												grupoController.show);
router.get('/grupos/:grupoId(\\d+)/edit',       sessionController.adminRequired, 	grupoController.edit);
router.put('/grupos/:grupoId(\\d+)',            sessionController.adminRequired, 	grupoController.update);
router.delete('/grupos/:grupoId(\\d+)', 		sessionController.adminRequired, 	grupoController.destroy);

//Materias
router.get('/materias', materiaController.index);
router.get('/materias/:materiaId(\\d+)', materiaController.show);
router.get('/materias/new', sessionController.adminRequired, materiaController.new);
router.post('/materias/create', sessionController.adminRequired, materiaController.create);
router.get('/materias/:materiaId(\\d+)/edit', sessionController.adminRequired, materiaController.edit);
router.put('/materias/:materiaId(\\d+)',                  sessionController.adminRequired, materiaController.update)
router.delete('/materias/:materiaId(\\d+)', sessionController.adminRequired, materiaController.destroy);

//Observaciones
router.get('/observaciones/:observacionId(\\d+)', observacionController.show);
router.get('/observaciones', sessionController.adminRequired, observacionController.index); 
router.get('/observaciones/:observacionId(\\d+)/edit',            sessionController.adminRequired, observacionController.edit);
router.put('/observaciones/:observacionId(\\d+)',                  sessionController.adminRequired, observacionController.update);
router.delete('/observaciones/:observacionId(\\d+)', sessionController.adminRequired, observacionController.destroy);

//Preguntas
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new', sessionController.loginRequired, quizController.new);
router.post('/quizes/create', sessionController.loginRequired, quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.destroy);

//Profesores
router.get('/profesores', sessionController.adminRequired, profesorController.index); /* Listado - Alex Baquerizo Jimenez */
router.get('/profesores/new', sessionController.adminRequired, profesorController.new);
router.post('/profesores/create', sessionController.adminRequired, profesorController.create);
router.get('/profesores/:profesorId(\\d+)', sessionController.adminRequired, profesorController.show);
router.put('/profesores/:profesorId(\\d+)', sessionController.adminRequired, profesorController.update);
router.delete('/profesores/:profesorId(\\d+)', sessionController.adminRequired, profesorController.destroy);
router.get('/profesores/:profesorId(\\d+)/edit', sessionController.adminRequired, profesorController.edit);

// Users
router.get('/users', 							sessionController.adminRequired, 	userController.index);
router.get('/users/:userId(\\d+)/edit',         sessionController.adminRequired, 	userController.edit);
router.put('/users/:userId(\\d+)',              sessionController.adminRequired, 	userController.update);
router.delete('/users/:userId(\\d+)', 			sessionController.adminRequired, 	userController.destroy);

/* Editando mis rutas */

var serviciosController = require('../controllers/servicios_controller');
var proyectosController = require('../controllers/proyectos_controller');
var inicioController = require('../controllers/inicio_controller');

/* GET home page. */
router.get('/', inicioController.index);

//Rutas de la web.
router.get('/servicios', serviciosController.index);
router.get('/servicios/videojuegos', serviciosController.videojuegos);

router.get('/proyectos', proyectosController.index);

module.exports = router;

