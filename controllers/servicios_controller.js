var models = require('../models/models.js');

// GET /servicios
exports.index = function(req, res) {
    res.render('servicios/index.ejs', {title: 'Jugaba Interactive - Servicios'});
}

exports.videojuegos = function(req, res) {
    res.render('servicios/videojuegos.ejs', {title: 'Jugaba Interactive - Desarrollo de Videojugos'});
}
