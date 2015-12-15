// modelo Novedades

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Novedades',
	{
		
		titulo: {
			type: DataTypes.STRING,
			validate: {notEmpty: { msg: "->Falta Titulo" }}
		},

		resumen: {
			type: DataTypes.STRING,
			validate: {notEmpty: { msg: "->Falta Resumen" }}
		},

		contenido: {
			type: DataTypes.STRING,
			validate: {notEmpty: { msg: "->Falta Contenido" }}
		},

		categoria: {
			type: DataTypes.INTEGER,
			validate: {notEmpty: { msg: "->Falta Categoria" }}
		},

        fecha: {
			type: DataTypes.DATE,
		}
	});
};

