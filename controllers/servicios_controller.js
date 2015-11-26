var models = require('../models/models.js');

// GET /servicios
exports.index = function(req, res) {
	models.Quiz.findAll().then(
                function(servicios) {
    res.render('servicios/index.ejs', {servicios: servicios, title: 'Jugaba Interactive - Servicios'});
});
}
