//Definición del modelo de Observacion

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Observacion',
	{
		profesor: {
			type: DataTypes.STRING,
			validate: {notEmpty: {msg: "->Falta Profesor"}}
		},
		cuestionario: {
			type: DataTypes.INTEGER,
			validate: {notEmpty: {msg: "->Falta Cuestionario"}}
		},
		observacion: {
			type: DataTypes.STRING,
			validate: {notEmpty: {msg: "->Falta Observación"}}
		}
	});
}