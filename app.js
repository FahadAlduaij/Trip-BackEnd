require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const passport = require("passport");
const { appendFile } = require("fs");
const connectDB = require("./database");

const app = express();
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

console.log(path.join(__dirname, "media"));

app.listen(process.env.PORT, () =>
	console.log(`Server Running on port ${process.env.PORT}`)
);
