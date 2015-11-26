//Definición del modelo de User

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('User',
	{
		username: {
			type: DataTypes.STRING,
			validate: {notEmpty: {msg: "->Falta Nombre de Usuario"}}
		},
		password: {
			type: DataTypes.STRING,
			validate: {notEmpty: {msg: "->Falta Contraseña"}}
		}
	});
}