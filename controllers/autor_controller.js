// GET /autores
exports.list = function(req, res) {
    listaAutores = ['Alberto Sierra', 'Pedro Pérez','Nicolas Canovas', 'Angel Pedro Samper Albaladejo'];
    res.render('autores/autores', {varAutores: listaAutores});
};
