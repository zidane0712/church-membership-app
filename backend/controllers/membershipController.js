// [IMPORTS]
const Membership = require("../models/Membership");

// [FUNCTIONS]
// Retrieve all members
module.exports.index = async (req, res) => {
  const members = await Membership.find({});
  console.log(members);
  res.send(members);
};

// Adds a new member
module.exports.addMember = async (req, res) => {
  const member = new Membership(req.body);
  await member.save();
  console.log(req.body);
  res.send("Add member");
};

// Retrieves members based on query parameters
module.exports.getMembers = async (req, res) => {
  const query = {};
  const { organization, membershipClass, gender, civilStatus } = req.query;

  // Build the query object based on available query parameters
  if (organization) {
    query.organization = { $regex: new RegExp(`^${organization}$`, "i") }; // Case-insensitive regex
  }
  if (membershipClass) {
    query.membership = { $regex: new RegExp(`^${membershipClass}$`, "i") }; // Case-insensitive regex
  }
  if (gender) {
    query.gender = { $regex: new RegExp(`^${gender}$`, "i") }; // Case-insensitive regex
  }
  if (civilStatus) {
    query.civilStatus = { $regex: new RegExp(`^${civilStatus}$`, "i") }; // Case-insensitive regex
  }

  const members = await Membership.find(query);
  console.log(organization, membershipClass, gender, civilStatus);
  res.send(members);
};

// Retrieve birthday celebrants
module.exports.getBirthdayCelebrants = async (req, res) => {
  const { startDate, endDate } = req.query;
};
