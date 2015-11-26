var models = require('../models/models.js');

// Autoload - factoriza el código si ruta incluye :materiaId
exports.load = function(req, res, next, materiaId) {
	models.Materia.find({
		where : {
			id : Number(materiaId)
		},
	}).then(function(materia) {
		if (materia) {
			req.materia = materia;
			next();
		} else {
			next(new Error('No existe materiaId=' + materiaId));
		}
	}).catch(function(error) {
		next(error);
	});
};

// GET /materia/index
exports.index = function(req, res) {
	models.Materia.findAll().then(
                function(materias) {
    res.render('materias/index.ejs', {materias: materias});
});
}

// GET /materias/:materiaId
exports.show = function(req, res) {
    res.render('materias/show', {materia: req.materia});
};

// GET /materias/new
exports.new = function(req, res) {
	var materia = models.Materia.build( //crea objeto materia
	{materia: "Materia", ensenanza: "Ensenanza", curso: "Curso"}
	);
    res.render('materias/new', {materia: materia});
};

// POST /quizes/create
exports.create = function(req, res) {
	var materia = models.Materia.build( req.body.materia );
	
	//guarda en DB los campos de materias
	materia.validate()
	.then(
		function(err){
			if(err) {
			res.render('materias/new', {materia: materia, errors: err.errors});
			} else {
				materia.save({fields: ["id", "materia", "ensenanza", "curso"]}).then(function(){
					res.redirect('/admin/materias');
				})	//Redireccion HTTP (URL relativo) lista de materias
			}
		}
	);
};

//editar materia
exports.edit=function(req,res){
    var materia=req.materia;//autoload de instancia de materia
    res.render('materias/edit', {materia : materia});
};

//actualizar materia
exports.update=function(req,res){
    req.materia.materia = req.body.materia.materia;
    req.materia.ensenanza = req.body.materia.ensenanza;
	req.materia.curso=req.body.materia.curso;
    
    req.materia
            .validate()
            .then(
            function(err){
                if(err){
                res.render('materias/edit', {materia: req.materia, errors: err.errors});
            }else  {
                req.materia
                        .save({fields:["materia", "ensenanza","curso"]})
                        .then(function(){res.redirect('/admin/materias');});
            }
        }
    );
};

//Elimina materia

exports.destroy = function(req, res) {
	req.materia.destroy().then(function() {
		res.redirect('/admin/materias');
	}).catch(function(error) {
		next(error)
	});
}; 