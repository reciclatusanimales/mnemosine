const express = require("express");

const {
	getTasks,
	addTask,
	updateTask,
	archiveTask,
	deleteTask,
} = require("../controllers/tasks");
const { auth } = require("../middleware/auth");

const router = express.Router({ mergeParams: true });

router.route("/").get(auth, getTasks).post(auth, addTask);

router.route("/:id").put(auth, updateTask).delete(auth, deleteTask);

router.route("/:id/archive").post(auth, archiveTask);

module.exports = router;
