// [DEPENDENCIES]
const mongoose = require("mongoose");

// [SCHEMA DECLARATION]
const membershipSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
  },
  middleName: {
    type: String,
    required: [true, "Middle name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Surname is required"],
  },
});

// [EXPORT]
module.exports = mongoose.model("Membership", membershipSchema);
