// modelo cuestionario

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Cuestionario',
	{
		creador: {
                    type: DataTypes.INTEGER,
                    validate: {notEmpty: {msg: "->Falta Creador"}}
		},

		observaciones: {
			type: DataTypes.STRING,
			validate: {notEmpty: { msg: "->Falta Obervaciones" }}
		},
                fechaFin: {
			type: DataTypes.DATE,
			validate: {notEmpty: { msg: "->Falta  Fecha"}}
		}
	});
};

