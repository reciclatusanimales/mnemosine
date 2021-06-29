"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Task extends Model {
		static associate({ Project }) {
			this.belongsTo(Project, {
				foreignKey: "projectId",
				as: "project",
			});
		}
	}
	Task.init(
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
			projectId: {
				type: DataTypes.UUID,
				allowNull: false,
			},
			date: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			tags: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			archived: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			taglist: {
				type: DataTypes.VIRTUAL,
				get() {
					return this.tags ? JSON.parse(this.tags) : [];
				},
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
