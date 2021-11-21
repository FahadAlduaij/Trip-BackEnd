require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const passport = require("passport");
const { appendFile } = require("fs");
const connectDB = require("./database");

// Passport
const { localStrategy, jwtStrategy } = require("./middleware/passport");

const app = express();
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
const { errorHandler } = require("./middleware/errorHandler");

// Passport
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

app.use("/media", express.static(path.join(__dirname, "media")));

// Error Handler
app.use(errorHandler);

app.listen(process.env.PORT || 8080, () =>
	console.log(`Server Running on port ${process.env.PORT}`)
);
