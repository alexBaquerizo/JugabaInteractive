// Definicion de Modelo de Cuestionario Asignado

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('CuestionarioAsignado',
	{
		completado: {
			type: DataTypes.INTEGER
		}
	});
}