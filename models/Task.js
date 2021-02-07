"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Task extends Model {
		static associate({ Project }) {
			this.belongsTo(Project, {
				foreignKey: "projectId",
			});
		}
	}
	Task.init(
		{
			uuid: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			projectId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			date: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			archived: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
		},
		{
			sequelize,
			modelName: "Task",
			tableName: "tasks",
		}
	);
	return Task;
};
