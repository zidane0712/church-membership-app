// [DEPENDENCIES]
const express = require("express");
const router = express.Router();

// [IMPORTS]
const membershipController = require("../controllers/membershipController");
const asyncHandler = require("../middlewares/asyncHandler");

// [ROUTES]
router.route("/").get(asyncHandler(membershipController.index));

module.exports = router;
