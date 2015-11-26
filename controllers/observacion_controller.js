var models = require('../models/models.js');

// Autoload - factoriza el código si ruta incluye : observacionId
exports.load = function(req, res, next,observacionId) {
	models.Observacion.find({
		where : {
			id : Number(observacionId)
		},
	}).then(function(observacion) {
		if (observacion) {
			req.observacion = observacion;
			next();
		} else {
			next(new Error('No existe observacionId=' + observacionId));
		}
	}).catch(function(error) {
		next(error);
	});
};

//Muestra las observaciones
exports.index = function(req, res) {
	models.Observacion.findAll().then(
		function(observaciones){
			res.render('observaciones/index.ejs', {observaciones: observaciones});
		}
	).catch(function(error){next(error);})
};

exports.edit=function(req,res){
    var observacion=req.observacion;//autoload de instancia de quiz
    res.render('observaciones/edit', {observacion : observacion});
};

exports.update=function(req,res){
    req.observacion.profesor = req.body.observacion.profesor;
    req.observacion.cuestionario = req.body.observacion.cuestionario;
	req.observacion.observacion = req.body.observacion.observacion;

	
    req.observacion
            .validate()
            .then(
            function(err){
                if(err){
                res.render('observaciones/edit', {observacion: req.observacion, errors: err.errors});
            }else  {
                req.observacion
                        .save({fields:["profesor", "cuestionario","observacion"]})
                        .then(function(){res.redirect('/admin/observaciones/');});
            }
        }
    );
};

//Elimina observaciones

exports.destroy = function(req, res) {
	req.observacion.destroy().then(function() {
		res.redirect('/admin/observaciones');
	}).catch(function(error) {
		next(error)
	});
}; 
// GET /observaciones/:observacionId
exports.show = function(req, res) {
    res.render('observaciones/show', {observacion: req.observacion});
};