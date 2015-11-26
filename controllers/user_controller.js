var models = require('../models/models.js');

// Autoload - factoriza el código si ruta incluye :userId
exports.load = function(req, res, next, userId) {
	models.User.find({
		where : {
			id : Number(userId)
		},
	}).then(function(user) {
		if (user) {
			req.user = user;
			next();
		} else {
			next(new Error('No existe userId=' + userId));
		}
	}).catch(function(error) {
		next(error);
	});
};

// Autenticar con la base de datos de usuarios
exports.autenticar = function(login, pass, callback) {
	models.User.find({
            where: { username: login, password: pass }
        }).then(function(user) {
				if(user) {
				callback(null, user);
			} else {
				callback(new Error('Nombre de usuario o contraseña incorrecta.'));
			}
		}
	).catch(function(error){ callback(new Error('Error al introducir los datos'));});
};


//Muestra los usuarios
exports.index = function(req, res) {
	models.User.findAll().then(
		function(users){
			res.render('users/index.ejs', {users: users});
		}
	).catch(function(error){next(error);})
};

exports.edit=function(req,res){
    var user=req.user;//autoload de instancia de quiz
    res.render('users/edit', {user : user});
};

exports.miPerfil=function(req,res){
	models.User.find({
		where : {
			id : Number(req.session.user.id)
		},
	}).then(function(user) {
		if (user) {
			res.render('users/miPerfil', {user : user});
		} else {
			res.redirect('/');
		}
	}).catch(function(error) {
		res.redirect('/miPerfil'); // TODO lanzar error
	});
    
};

exports.update=function(req,res){
    req.user.username = req.body.user.username;
    req.user.password = req.body.user.password;
    
    req.user
            .validate()
            .then(
            function(err){
                if(err){
                res.render('users/edit', {user: req.user, errors: err.errors});
            }else  {
                req.user
                        .save({fields:["username", "password"]})
                        .then(function(){res.redirect('/admin/users/');});
            }
        }
    );
};

exports.updateMiPerfil=function(req,res){
	models.User.find({
		where : {
			id : Number(req.session.user.id)
		},
	}).then(function(user) {
		if (user) {
			user.username = req.body.user.username;
			user.password = req.body.user.password;
			
			user
					.validate()
					.then(
					function(err){
						if(err){
						res.render('users/miPerfil', {user: req.user, errors: err.errors});
					}else  {
						user
								.save({fields:["username", "password"]})
								.then(function(){
									req.session.user.username = user.username;
									res.redirect('/miPerfil');
									});
					}
				}
    );
		} else {
			res.redirect('/');
		}
	}).catch(function(error) {
		res.redirect('/miPerfil'); // TODO lanzar error
	});

};

//Elimina users

exports.destroy = function(req, res) {
	req.user.destroy().then(function() {
		res.redirect('/admin/users');
	}).catch(function(error) {
		next(error)
	});
}; 