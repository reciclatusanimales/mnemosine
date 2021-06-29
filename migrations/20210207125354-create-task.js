"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("tasks", {
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				allowNull: false,
				primaryKey: true,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			userId: {
				type: Sequelize.UUID,
				allowNull: false,
			},
			projectId: {
				type: Sequelize.UUID,
				allowNull: false,
			},
			date: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			tags: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			archived: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("tasks");
	},
};
