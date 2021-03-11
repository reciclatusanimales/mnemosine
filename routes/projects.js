const { Project } = require("../models");

exports.getProjects = async (request, response) => {
	const user = response.locals.user;

	try {
		const data = await Project.findAll({ where: { userId: user.id } });
		return response.status(200).json(data);
	} catch (error) {
		console.log(error);
		return response.status(500).json({ error: error });
	}
};

exports.addProject = async (request, response) => {
	const user = response.locals.user;
	const { name } = request.body;

	try {
		const data = await Project.create({
			name,
			userId: user.id,
		});
		return response.status(200).json(data);
	} catch (error) {
		return response.status(500).json({ error: error });
	}
};

exports.updateProject = async (request, response) => {
	const { id, name } = request.body;

	try {
		const project = await Project.findByPk(id);
		if (!project)
			return response.status(404).json({ error: "Project not found." });

		project.name = name;
		await project.save();

		return response.status(200).json(project);
	} catch (error) {
		return response.status(500).json({ error: error });
	}
};

exports.deleteProject = async (request, response) => {
	const { id } = request.body;

	try {
		const project = await Project.findByPk(id);
		if (!project)
			return response.status(404).json({ error: "Project not found." });

		await project.destroy();

		return response.status(200).json(id);
	} catch (error) {
		return response.status(500).json({ error: error });
	}
};
