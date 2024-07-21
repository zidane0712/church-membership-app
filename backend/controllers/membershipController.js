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

  if (!startDate || !endDate) {
    return res.status(400).send("Both startDate and endDate are required");
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  // Check if dates are valid
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return res.status(400).send("Invalid date format.");
  }

  // Extract month and day from startDate and endDate
  const startMonthDay = { month: start.getMonth() + 1, day: start.getDate() };
  const endMonthDay = { month: end.getMonth() + 1, day: end.getDate() };

  // Create regex patterns for matching month and day
  const startPattern = new RegExp(
    `^${startMonthDay.month.toString().padStart(2, "0")}-${startMonthDay.day
      .toString()
      .padStart(2, "0")}`
  );
  const endPattern = new RegExp(
    `^${endMonthDay.month.toString().padStart(2, "0")}-${endMonthDay.day
      .toString()
      .padStart(2, "0")}`
  );

  // Query to get members whose birthdays fall within the specified range
  const members = await Membership.find({
    $expr: {
      $and: [
        {
          $regexMatch: {
            input: {
              $concat: [
                { $substr: ["$birthday", 5, 2] },
                "-",
                { $substr: ["$birthday", 8, 2] },
              ],
            },
            regex: startPattern,
          },
        },
        {
          $regexMatch: {
            input: {
              $concat: [
                { $substr: ["$birthday", 5, 2] },
                "-",
                { $substr: ["$birthday", 8, 2] },
              ],
            },
            regex: endPattern,
          },
        },
      ],
    },
  });

  console.log(members);
  res.send(members);
};
