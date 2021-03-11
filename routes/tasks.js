const Sequelize = require("sequelize");
const { Task, Project } = require("../models");

exports.getTasks = async (request, response) => {
	const user = response.locals.user;

	try {
		const data = await Task.findAll({
			where: {
				userId: user.id,
				archived: false,
			},
			include: "project",
		});
		return response.status(200).json(data);
	} catch (error) {
		console.log(error);
		return response.status(500).json({ error: error });
	}
};

exports.addTask = async (request, response) => {
	const user = response.locals.user;
	const { name, projectId, date } = request.body;

	try {
		const data = await Task.create({
			name,
			projectId,
			userId: user.id,
			date,
			archived: false,
		});
		return response.status(200).json(data);
	} catch (error) {
		return response.status(500).json({ error: error });
	}
};

exports.archiveTask = async (request, response) => {
	const { id } = request.body;

	try {
		const task = await Task.findByPk(id);
		if (!task)
			return response.status(404).json({ error: "Task not found." });

		task.archived = true;
		await task.save();

		return response.status(200).json(id);
	} catch (error) {
		return response.status(500).json({ error: error });
	}
};

exports.updateTask = async (request, response) => {
	const { id, name, projectId, date } = request.body;

	try {
		const task = await Task.findOne({
			where: { id: id },
			include: "project",
		});
		if (!task)
			return response.status(404).json({ error: "Task not found." });

		task.name = name;
		task.projectId = projectId;
		task.date = date;
		await task.save();

		return response.status(200).json(task);
	} catch (error) {
		return response.status(500).json({ error: error });
	}
};

exports.deleteTask = async (request, response) => {
	const { id } = request.body;

	try {
		const task = await Task.findByPk(id);
		if (!task)
			return response.status(404).json({ error: "Task not found." });

		await task.destroy();

		return response.status(200).json(id);
	} catch (error) {
		return response.status(500).json({ error: error });
	}
};
