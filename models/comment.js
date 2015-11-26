module.exports = function(sequelize, DataTypes){
    return sequelize.define(
            'Comment',
		{
			texto: {
				type: DataTypes.STRING,
				validate: { notEmpty: {msg: "-> Falte Cmonetario"}}
			},
			publicado: {
					type: DataTypes.BOOLEAN,
					defaultValue: false
			}
		}
	);
}