const asyncHandler = require("../middleware/async");
const { Project, Task } = require("../models");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Get all tasks
// @route   GET /api/v1/tasks
// @access  Private
exports.getTasks = asyncHandler(async (req, res, next) => {
	const user = res.locals.user;

	const data = await Task.findAll({
		where: {
			userId: user.id,
			archived: false,
		},
		order: [["name", "ASC"]],
		include: "project",
	});

	res.status(200).json({
		success: true,
		count: data.length,
		data,
	});
});

// @desc      Add task
// @route     POST /api/v1/projects/:projectId/tasks
// @access    Private
exports.addTask = asyncHandler(async (req, res, next) => {
	const user = res.locals.user;
	req.body.projectId = req.params.projectId;
	req.body.userId = user.id;

	const project = await Project.findByPk(req.params.projectId);

	if (!project) {
		return next(
			new ErrorResponse(
				`El proyecto con id ${req.params.projectId} no existe.`
			),
			404
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

	const task = await Task.create(req.body);

	res.status(200).json({
		success: true,
		data: task,
	});
});

// @desc      Update task
// @route     PUT /api/v1/tasks/:id
// @access    Private
exports.updateTask = asyncHandler(async (req, res, next) => {
	const user = res.locals.user;
	const { name, projectId, date } = req.body;

	const task = await Task.findByPk(req.params.id, { include: "project" });

	if (!task) {
		return next(
			new ErrorResponse(`La tarea con id ${req.params.id} no existe.`),
			404
		);
	}

	if (task.userId !== user.id) {
		return next(
			new ErrorResponse(
				`El usuario ${user.username} no está autorizado para modificar esta tarea.`,
				401
			)
		);
	}

	task.name = name;
	task.projectId = projectId;
	task.date = date;
	await task.save();

	res.status(200).json({
		success: true,
		data: task,
	});
});

// @desc      Archive task
// @route     PUT /api/v1/tasks/:id/archive
// @access    Private
exports.archiveTask = asyncHandler(async (req, res, next) => {
	const user = res.locals.user;

	const task = await Task.findByPk(req.params.id);

	if (!task) {
		return next(
			new ErrorResponse(`La tarea con id ${req.params.id} no existe.`),
			404
		);
	}

	if (task.userId !== user.id) {
		return next(
			new ErrorResponse(
				`El usuario ${user.username} no está autorizado para modificar esta tarea.`,
				401
			)
		);
	}

	task.archived = true;
	await task.save();

	res.status(200).json({
		success: true,
		data: task,
	});
});

// @desc      Delete task
// @route     DELETE /api/v1/tasks/:id
// @access    Private
exports.deleteTask = asyncHandler(async (req, res, next) => {
	const user = res.locals.user;
	const task = await Task.findByPk(req.params.id);

	if (!task) {
		return next(
			new ErrorResponse(`La tarea con id ${req.params.id} no existe.`),
			404
		);
	}

	if (task.userId !== user.id) {
		return next(
			new ErrorResponse(
				`El usuario ${user.username} no está autorizado para eliminar esta tarea.`,
				401
			)
		);
	}

	await task.destroy();

	res.status(200).json({
		success: true,
		data: {},
	});
});
