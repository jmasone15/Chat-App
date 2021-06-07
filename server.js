const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

// Express setup
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(morgan("tiny"));

// Database

// Routes
app.get("/", (req, res) => {
    res.send("Hello, world!");
});


// Start Server
app.listen(PORT, () => console.log(`Running on port: ${PORT}🌎`))