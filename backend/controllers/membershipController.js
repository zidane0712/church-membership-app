// [IMPORTS]
const Membership = require("../models/Membership");

// [FUNCTIONS]
module.exports.index = async (req, res) => {
  const members = await Membership.find({});
  console.log(members);
  res.send(members);
};

module.exports.addMember = async (req, res) => {
  const member = new Membership(req.body);
  await member.save();
  console.log(req.body);
  res.send("Add member");
};
