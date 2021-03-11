"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		static associate({ Project }) {
			this.hasMany(Project, {
				foreignKey: "userId",
				as: "projects",
			});
		}
	}
	User.init(
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				unique: true,
				autoIncrement: true,
			},
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				primaryKey: true,
				unique: true,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					isEmail: {
						args: true,
						msg: "El correo no es válido.",
					},
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			imageUrn: DataTypes.STRING,
			imageUrl: {
				type: DataTypes.VIRTUAL,
				get() {
					return this.imageUrn
						? `${process.env.APP_URL}/images/profiles/${this.imageUrn}`
						: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";
				},
			},
		},
		{
			sequelize,
			modelName: "User",
			tableName: "users",
		}
	);
	return User;
};
