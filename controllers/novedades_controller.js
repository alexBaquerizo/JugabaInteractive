var models = require('../models/models.js');

// Autoload - factoriza el código si ruta incluye :novedadesId
exports.load = function(req, res, next, novedadesId) {
	models.Novedades.find({
		where : {
			id : Number(novedadesId),			
		},
	}).then(function(novedades) {
		if (novedades) {
			req.novedades = novedades;
			next();
		} else {
			next(new Error('No existe novedadesId=' + novedadesId));
		}
	}).catch(function(error) {
		next(error);
	});
};

//Muestra las Novedades
exports.index = function(req, res) {
	models.Novedades.findAll().then(
		function(novedades){
			res.render('index.', {novedades: novedades});
		}
	).catch(function(error){next(error);})
};

// GET /profesores/new
exports.new = function(req, res) {
	var profesor = models.Profesor.build( //crea objeto quiz
	{apellidos: "apellidos", nombre: "nombre", email: "email", dni: "dni", movil: "movil", departamento: "departamento"}
	);
    res.render('profesores/new', {profesor: profesor});
};

// POST /profesores/create
exports.create = function(req, res) {
	var profesor = models.Profesor.build( req.body.profesor );
	
	//guarda en DB
	profesor.validate()
	.then(
		function(err){
			if(err) {
			res.render('profesor/new', {profesor: profesor, errors: err.errors});
			} else {
				profesor.save({fields: ["apellidos", "nombre", "email", "dni", "movil", "departamento"]}).then(function(){
					res.redirect('/admin/profesores');
				})	//Redireccion HTTP (URL relativo) lista de profesores
			}
		}
	);
};


// GET /profesores/:id/edit - Editar Profesor
exports.edit = function(req, res) {
    var profesor = req.profesor; //autoload de instancia de profesor
    res.render('profesores/edit', {profesor: profesor});
};

exports.update = function(req, res) {
    req.profesor.apellidos = req.body.profesor.apellidos;
    req.profesor.nombre = req.body.profesor.nombre;
    req.profesor.email = req.body.profesor.email;
	req.profesor.dni = req.body.profesor.dni;
	req.profesor.movil = req.body.profesor.movil;
	req.profesor.departamento = req.body.profesor.departamento;
    req.profesor
            .validate()
            .then(
            function(err){
                if(err){
                    res.render('profesores/edit',{profesor: req.profesor});
                }else{
                    req.profesor
                            .save({fields:["apellidos", "nombre", "email", "dni", "movil", "departamento"]})
                            .then(function(){res.redirect('/admin/profesores');});
                }
            }
        );
};


// GET /quizes/: Cuestionario
exports.show = function(req, res, next) {
	models.Cuestionario.findAll({
		where : {
			creador : Number(req.profesor.id),			
		}
	}).then(function(cuestionarios) {
		res.render('profesores/show', {profesor: req.profesor, cuestionarios: cuestionarios});
	}).catch(function(error) {
		next(error);
	});
};


// Eliminar Profesor
exports.destroy = function(req, res) {
    req.profesor.destroy().then( function(){
        res.redirect('/admin/profesores');
    }).catch(function(error){next(error)});
};
