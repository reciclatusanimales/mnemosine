"use strict";
const { Model } = require("sequelize");
const crypto = require("crypto");

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
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				allowNull: false,
				primaryKey: true,
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
			resetPasswordToken: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			resetPasswordExpire: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			accountType: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: "email",
			},
			imageUrn: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			imageUrl: {
				type: DataTypes.VIRTUAL,
				get() {
					return this.imageUrn
						? `${process.env.BASE_URL}/uploads/profile_photos/${this.imageUrn}`
						: null;
				},
			},
		},
		{
			sequelize,
			modelName: "User",
			tableName: "users",
		}
	);

	User.prototype.getResetPasswordToken = function () {
		const resetToken = crypto.randomBytes(20).toString("hex");

		this.resetPasswordToken = crypto
			.createHash("sha256")
			.update(resetToken)
			.digest("hex");

		this.resetPasswordExpire = Date.now() + 60 * 60 * 1000;

		return resetToken;
	};

	return User;
};
