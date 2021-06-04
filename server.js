const express = require("express");
const path = require("path");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");

const colors = require("colors");

require("dotenv").config();
const PORT = process.env.PORT;
const { Client } = require("pg");
const cors = require("cors");
const { sequelize } = require("./models");

const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

app.use(cookieParser());

app.get("/api", (req, res) => {
	res.send("Hello Friend...");
});

app.use(fileupload());

const errorHandler = require("./middleware/error");

const projects = require("./routes/projects");
const tasks = require("./routes/tasks");
const auth = require("./routes/auth");

app.use("/api/v1/auth", auth);
app.use("/api/v1/projects", projects);
app.use("/api/v1/tasks", tasks);
app.use(errorHandler);

app.listen(PORT, console.log(`Listen on port: ${PORT}`));
