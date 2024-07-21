const mongoose = require("mongoose");

// [ENUM DEFINITIONS]
const userClassification = ["encoder", "admin"];

// [SCHEMA DECLARATION]
const userSchema = new mongoose.Schema({
  name: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isEncoder: {
    type: Boolean,
    default: false,
  },
});

// [EXPORT]
module.exports = mongoose.model("User", userSchema);
