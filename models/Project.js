"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Project extends Model {
		static associate(models) {}
	}
	Project.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				allowNull: false,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			userId: {
				type: DataTypes.UUID,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "Project",
			tableName: "projects",
		}
	);
	return Project;
};
