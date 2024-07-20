const mongoose = require("mongoose");

// [ENUM DEFINITIONS]
const GenderEnum = ["Male", "Female"];
const CivilStatusEnum = ["Single", "Married", "Separated", "Widowed"];
const MembershipEnum = [
  "Baptized",
  "Professing",
  "Constituent",
  "Affiliate",
  "Associate",
];
const OrganizationEnum = ["UMCF", "UMYF", "UMYAF", "UMM", "UMWSCS"];

// [SCHEMA DECLARATION]
const membershipSchema = new mongoose.Schema({
  name: {
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    suffix: { type: String },
  },
  address: {
    permanent: {
      street: { type: String },
      barangay: { type: String },
      town: { type: String },
      city: { type: String },
      province: { type: String },
    },
    current: {
      street: { type: String },
      barangay: { type: String },
      town: { type: String },
      city: { type: String },
      province: { type: String },
    },
  },
  gender: {
    type: String,
    enum: GenderEnum,
    required: true,
  },
  civilStatus: {
    type: String,
    enum: CivilStatusEnum,
    required: true,
  },
  birthday: { type: Date, required: true },
  age: {
    type: Number,
    default: function () {
      // Compute age based on birthday
      const today = new Date();
      const birthDate = new Date(this.birthday);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      return age;
    },
  },
  contactNo: { type: String },
  emailAddress: { type: String, required: true, unique: true },
  baptism: {
    year: {
      type: Date,
      required: false,
    },
    officiatingMinister: {
      type: String,
      required: false,
    },
  },
  confirmation: {
    year: {
      type: Date,
      required: false,
    },
    officiatingMinister: {
      type: String,
      required: false,
    },
  },
  father: {
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    suffix: { type: String },
  },
  mother: {
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    suffix: { type: String },
  },
  membership: {
    type: String,
    enum: MembershipEnum,
    required: true,
  },
  organization: {
    type: String,
    enum: OrganizationEnum,
  },
});

// [CUSTOM VALIDATION]
membershipSchema.pre("validate", function (next) {
  // Custom validation for baptism
  if (this.baptism && !this.baptism.year && !this.baptism.officiatingMinister) {
    this.invalidate(
      "baptism",
      "Either year or officiatingMinister is required."
    );
  }

  // Custom validation for confirmation
  if (
    this.confirmation &&
    !this.confirmation.year &&
    !this.confirmation.officiatingMinister
  ) {
    this.invalidate(
      "confirmation",
      "Either year or officiatingMinister is required."
    );
  }

  // Automatically set organization based on age and gender
  const age = this.age;
  const gender = this.gender;

  if (age < 12) {
    this.organization = "UMCF";
  } else if (age >= 12 && age <= 23) {
    this.organization = "UMYF";
  } else if (age > 23 && age <= 40) {
    this.organization = "UMYAF";
  } else if (age > 40 && gender === "Male") {
    this.organization = "UMM";
  } else if (age > 40 && gender === "Female") {
    this.organization = "UMWSCS";
  }

  next();
});

// [EXPORT]
module.exports = mongoose.model("Membership", membershipSchema);
