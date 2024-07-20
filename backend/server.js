// [Dependencies]
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

// [Imports]
// const userRoute = require("./routes/userRoute");
const membershipRoute = require("./routes/membershipRoute");

// [Middlewares]
app.use(express.json()); // To parse JSON bodies
app.use(cors()); // To handle requests from different origins
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies

// [Mongoose DB Connection]
mongoose
  .connect(process.env.MONGO_URI)
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

// [Routes]
app.use("/membership", membershipRoute);

// [Listener]
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
