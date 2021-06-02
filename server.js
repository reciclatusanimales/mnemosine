const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT;
const { Client } = require("pg");
const cors = require("cors");
const { sequelize } = require("./models");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
	res.send("Hello Friend...");
});

const errorHandler = require("./middleware/error");

const projects = require("./routes/projects");
const tasks = require("./routes/tasks");
const auth = require("./routes/auth");

app.use("/api/v1/auth", auth);
app.use("/api/v1/projects", projects);
app.use("/api/v1/tasks", tasks);
app.use(errorHandler);

app.listen(PORT, console.log(`Listen on port: ${PORT}`));
