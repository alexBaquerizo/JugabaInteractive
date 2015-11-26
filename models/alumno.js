//Definici�n del modelo de Alumno

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Alumno',
	{
		dni: {
			type: DataTypes.STRING
		},
		apellido1: {
			type: DataTypes.STRING,
			validate: {notEmpty: {msg: "->Falta el Primer Apellido"}}
		},
		apellido2: {
			type: DataTypes.STRING
		},
		nombre: {
			type: DataTypes.STRING,
			validate: {notEmpty: {msg: "->Falta el Nombre"}}
		},
		email: {
			type: DataTypes.STRING
		}
	});

}