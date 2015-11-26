var models = require('../models/models.js');

exports.load = function(req, res, next, alumnoId) {
	models.Alumno.find({
		where : {
			id : Number(alumnoId)
		},
	}).then(function(alumno) {
		if (alumno) {
			req.alumno = alumno;
			next();
		} else {
			next(new Error('No existe alumnoId=' + alumnoId));
		}
	}).catch(function(error) {
		next(error);
	});
};
// Autenticar con la base de datos de usuarios
exports.roleAlumno = function(userId, callback){
	models.Alumno.find({
                    where: {
                        userId: Number(userId)
                    }
            }).then(function(alumno) {
                    callback(null, alumno);
		}
	).catch(function(error){ callback(new Error(error.message))});
};

exports.destroy = function(req, res) {
	req.alumno.destroy().then(function() {
		res.redirect('/admin/alumnos');
	}).catch(function(error) {
		next(error)
	});
}; 
//Muestra los alumnos
exports.index = function(req, res) {
	models.Alumno.findAll().then(
		function(alumnos){
			res.render('alumnos/index.ejs', {alumnos: alumnos});
		}
	).catch(function(error){next(error);})
};

// GET /alumnos/new
exports.new = function(req, res) {
	var alumno = models.Alumno.build( //crea objeto alumno
	{dni: "DNI", nombre: "Nombre", apellido1: "Apellido1", apellido2: "Apellido2", email: "E-mail", grupo: "Grupo"}//Ejercicio2
	);
    res.render('alumnos/new', {alumno: alumno});
};

// POST /alumnos/create
exports.create = function(req, res) {
	var alumno = models.Alumno.build( req.body.alumno );
	
	//guarda en DB los campos pregunta y respuesta de alumno
	alumno.validate()
	.then(
		function(err){
			if(err) {
			res.render('alumnos/new', {alumno: alumno, errors: err.errors});
			} else {
				alumno.save({fields: ["dni","nombre", "apellido1", "apellido2", "email"]}).then(function(){
					res.redirect('/admin/alumnos');
				})	//Redireccion HTTP (URL relativo) lista de preguntas
			}
		}
	);
};

exports.edit = function(req, res) {
    var alumno = req.alumno; //autoload de instancia de quiz
    res.render('alumnos/edit', {alumno: alumno});
};

exports.update = function(req, res) {
    req.alumno.dni = req.body.alumno.dni;
    req.alumno.nombre = req.body.alumno.nombre;
    req.alumno.apellido1 = req.body.alumno.apellido1;
    req.alumno.apellido2 = req.body.alumno.apellido2;
    req.alumno.email = req.body.alumno.email;
	req.alumno.grupo = req.body.alumno.grupo; //Ejercicio2
    
    req.alumno
            .validate()
            .then(
            function(err){
                if(err){
                    res.render('alumnos/edit',{alumno: req.alumno});
                }else{
                    req.alumno
                            .save({fields:["dni","nombre","apellido1","apellido2","email"]})
                            .then(function(){res.redirect('/admin/alumnos');});
                }
            }
        );
};

