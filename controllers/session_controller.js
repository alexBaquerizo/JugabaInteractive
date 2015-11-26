var models = require('../models/models.js');

// MW de autorizacion de accesos HTTP restringidos
exports.loginRequired = function(req,res, next){
	if(req.session.user){
		next();
		
	}else{
		res.redirect('/login');
	}
};


exports.adminRequired = function(req,res, next){
	if(req.session.user && req.session.user.username == "admin"){
		next();
		
	}else{ 
		req.session.errors = [{"message": 'No esta autenticado como admin'}];
		res.redirect("/login");
	}
};


// Get/login -- Formulario de login
exports.new = function(req,res){
	var errors = req.session.errors || {};
	req.session.errors = {};
	
	res.render('sessions/new', {errors: errors});	
};

// POST / login -- Crear la session
exports.create = function(req,res){
	var login = req.body.login;
	var password = req.body.password;
	
	var userController = require('./user_controller');
	userController.autenticar(login,password,function(error,user){
	
		if(error){
			req.session.errors = [{"message": 'Se ha producido un error: '+error}];
			res.redirect("/login");
			return;
		}
		req.session.user = {id:user.id, username:user.username};
            var profesorController = require('./profesor_controller');
            profesorController.roleProfesor(user.id,function(error,profesor){
                    if(error){
                            req.session.errors = [{"message": 'Se ha producido un error: '+error}];
                            res.redirect("/login");
                            return;
                    }
                    if(profesor) {
                        req.session.profesor = {id:profesor.id, nombre:profesor.nombre};
                        req.session.role = 1;
                    }
                    var alumnoController = require('./alumno_controller');
                    alumnoController.roleAlumno(user.id,function(error,alumno){
                            if(error){
                                req.session.errors = [{"message": 'Se ha producido un error: '+error}];
                                res.redirect("/login");
                                return;
                            }
                            if(alumno) {
                                req.session.alumno = {id:alumno.id, nombre:alumno.nombre};
                                req.session.role = 2;
                            }
                        res.redirect(req.session.redir.toString());
                    });
                        
            });
        });
};

// DELETE /logout)

exports.destroy = function(req,res){
	delete req.session.user;
	res.redirect(req.session.redir.toString());
};
