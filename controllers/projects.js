const asyncHandler = require("../middleware/async");
const { Project, Task } = require("../models");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Get all projects
// @route   GET /api/v1/projects
// @access  Private
exports.getProjects = asyncHandler(async (req, res, next) => {
	const user = res.locals.user;

	const data = await Project.findAll({
		where: { userId: user.id },
		//order: [["name", "ASC"]],
	});

	res.status(200).json({
		success: true,
		count: data.length,
		data,
	});
});

// @desc    Create new project
// @route   POST /api/v1/projects/
// @access  Private
exports.addProject = asyncHandler(async (req, res, next) => {
	const user = res.locals.user;
	const { name } = req.body;

	const data = await Project.create({
		name,
		userId: user.id,
	});

	res.status(201).json({
		success: true,
		data,
	});
});

// @desc    Update project
// @route   PUT /api/v1/projects/:id
// @access  Private
exports.updateProject = asyncHandler(async (req, res, next) => {
	const user = res.locals.user;
	const { name } = req.body;
	const project = await Project.findByPk(req.params.id);

	if (!project) {
		return next(
			new ErrorResponse(
				`El proyecto con id: ${req.params.id} no existe.`,
				404
			)
		);
	}

	if (project.userId !== user.id) {
		return next(
			new ErrorResponse(
				`El usuario ${user.username} no está autorizado para modificar este proyecto.`,
				401
			)
		);
	}

	project.name = name;
	await project.save();

	res.status(200).json({
		success: true,
		data: project,
	});
});

// @desc    Delete project
// @route   DELETE /api/v1/projects/:id
// @access  Private
exports.deleteProject = asyncHandler(async (req, res, next) => {
	const user = res.locals.user;
	const project = await Project.findByPk(req.params.id);

	if (!project) {
		return next(
			new ErrorResponse(
				`El proyecto con id: ${req.params.id} no existe.`,
				404
			)
		);
	}

	if (project.userId !== user.id) {
		return next(
			new ErrorResponse(
				`El usuario ${user.username} no está autorizado para eliminar este proyecto.`,
				401
			)
		);
	}

	await project.destroy();

	await Task.destroy({
		where: {
			projectId: project.id,
		},
	});

	res.status(200).json({
		success: true,
		data: project.id,
	});
});
