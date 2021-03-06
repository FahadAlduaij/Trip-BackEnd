require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

// Routers
const userRoutes = require("./apis/users/user.routes");
const tripRoutes = require("./apis/trips/trips.routes");

// Passport
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middleware/passport");

const app = express();

// Database
const connectDB = require("./database");
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

// Routes
app.use("/api", userRoutes);
app.use("/api/trips", tripRoutes);

// Error Handler
app.use(errorHandler);

app.listen(process.env.PORT || 8080, () =>
	console.log(`Server Running on port ${process.env.PORT}`)
);
