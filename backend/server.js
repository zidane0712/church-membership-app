require("dotenv").config();

// Requires
const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Imports

// Middlewares
app.use(express.json()); // To parse JSON bodies

// Mongoose DB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/jts-membership")
  .then(() => console.log("Connection open"))
  .catch((err) => {
    console.log("Connection Error");
    console.log(err);
  });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

// Routes

// Listener
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
