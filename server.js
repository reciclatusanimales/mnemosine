const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT;
const { Client } = require("pg");
const cors = require("cors");
const { sequelize } = require("./models");

const app = express();

app.use(cors());
app.use(express.json());

const { login, register, loginWithGoogle } = require("./routes/auth");
const { auth } = require("./middleware/auth");

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

app.post("/api/login", login);
app.post("/api/login-with-google", loginWithGoogle);
app.post("/api/register", register);

app.get("/api/projects", auth, getProjects);
app.post("/api/add-project", auth, addProject);
app.post("/api/update-project", auth, updateProject);
app.post("/api/delete-project", auth, deleteProject);

app.get("/api/tasks", auth, getTasks);
app.post("/api/add-task", auth, addTask);
app.post("/api/archive-task", auth, archiveTask);
app.post("/api/update-task", auth, updateTask);
app.post("/api/delete-task", auth, deleteTask);

app.listen(PORT, console.log(`Listen on port: ${PORT}`));
