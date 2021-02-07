const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT;
const { Client } = require("pg");
const cors = require("cors");
const { sequelize } = require("./models");

const app = express();

app.use(cors());
app.use(express.json());

const {
	getProjects,
	addProject,
	updateProject,
	deleteProject,
} = require("./routes/projects");

const {
	getTasks,
	addTask,
	archiveTask,
	updateTask,
	deleteTask,
} = require("./routes/tasks");

app.get("/api", (req, res) => {
	res.send("Hello Friend...");
});

app.get("/api/projects", getProjects);
app.post("/api/add-project", addProject);
app.post("/api/update-project", updateProject);
app.post("/api/delete-project", deleteProject);

app.get("/api/tasks", getTasks);
app.post("/api/add-task", addTask);
app.post("/api/archive-task", archiveTask);
app.post("/api/update-task", updateTask);
app.post("/api/delete-task", deleteTask);

app.listen(PORT, console.log(`Listen on port: ${PORT}`));
