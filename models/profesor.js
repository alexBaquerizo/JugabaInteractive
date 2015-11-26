//Definición del modelo de profesor

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Profesor',
	{
		apellidos: {
			type: DataTypes.STRING,
			validate: {notEmpty: {msg: "->Faltan Apellidos"}}
		},
		nombre: {
			type: DataTypes.STRING,
			validate: {notEmpty: {msg: "->Falta Nombre"}}
		},
		email: {
			type: DataTypes.STRING,
		},
		dni: {
			type: DataTypes.STRING,
		},
		movil: {
			type: DataTypes.STRING,
		},
		departamento: {
			type: DataTypes.STRING,
		},
	});

}