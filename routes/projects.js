const express = require("express");

const {
	getProjects,
	addProject,
	updateProject,
	deleteProject,
} = require("../controllers/projects");

const { auth } = require("../middleware/auth");

const tasksRouter = require("./tasks");

const router = express.Router();

// Re-route into other resource routers
router.use("/:projectId/tasks", tasksRouter);

router.route("/").get(auth, getProjects).post(auth, addProject);

router.route("/:id").put(auth, updateProject).delete(auth, deleteProject);

module.exports = router;
