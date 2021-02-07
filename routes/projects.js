const { Project } = require("../models");

exports.getProjects = async (requets, response) => {
	try {
		const data = await Project.findAll();
		return response.status(200).json(data);
	} catch (error) {
		return response.status(500).json({ error: error });
	}
};

exports.addProject = async (request, response) => {
	const { name } = request.body;
	const userId = 1;

	try {
		const data = await Project.create({
			name,
			userId,
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
