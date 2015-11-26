var models = require('../models/models.js');

// GET /proyectos
exports.index = function(req, res) {
	models.Quiz.findAll().then(
                function(proyectos) {
    res.render('proyectos/index.ejs', {proyectos: proyectos, title: 'Jugaba Interactive - Proyectos'});
});
}
