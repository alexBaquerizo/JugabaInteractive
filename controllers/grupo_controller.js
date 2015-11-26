var models = require('../models/models.js');

// Autoload - factoriza el código si ruta incluye :grupoId
exports.load = function(req, res, next, grupoId) {
	models.Grupo.find({
		where : {
			id : Number(grupoId),			
		}/* ,
		include: [{ model: models.Profesor }] */
	}).then(function(grupo) {
		if (grupo) {
			req.grupo = grupo;
			next();
		} else {
			next(new Error('No existe grupoId=' + grupoId));
		}
	}).catch(function(error) {
		next(error);
	});
};

//Muestra los grupos
exports.index = function(req, res) {
	models.Grupo.findAll().then(
		function(grupos){
			res.render('grupos/index.ejs', {grupos: grupos});
		}
	).catch(function(error){next(error);})
};

exports.show = function(req, res) {
    res.render('grupos/show', {grupo: req.grupo});
};

//Edita los grupos
exports.edit = function(req, res) {
    var grupo = req.grupo; //autoload de instancia de grupo
    res.render('grupos/edit', {grupo: grupo});
};

//Actualiza los grupos
exports.update=function(req,res){
    req.grupo.tutor = req.body.grupo.tutor;
    req.grupo.anyo = req.body.grupo.anyo;
    req.grupo.grupo = req.body.grupo.grupo;
    req.grupo.subgrupo = req.body.grupo.subgrupo;
    req.grupo.ensenanza = req.body.grupo.ensenanza;
    req.grupo.curso = req.body.grupo.curso;
    req.grupo.horarioVisita = req.body.grupo.horarioVisita;

    req.grupo
            .validate()
            .then(
            function(err){
                if(err){
                res.render('grupos/edit', {grupo: req.grupo, errors: err.errors});
            }else  {
                req.grupo
                        .save({fields:["tutor", "anyo", "grupo", "subgrupo", "ensenanza", "curso", "horarioVisita"]})
                        .then(function(){res.redirect('/admin/grupos/');});
            }
        }
    );
};

//Elimina los grupos
exports.destroy = function(req, res) {
	req.grupo.destroy().then(function() {
		res.redirect('/admin/grupos');
	}).catch(function(error) {
		next(error)
	});
}; 