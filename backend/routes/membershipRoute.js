// [DEPENDENCIES]
const express = require("express");
const router = express.Router();

// [IMPORTS]
const membershipController = require("../controllers/membershipController");
const asyncHandler = require("../middlewares/asyncHandler");

// [ROUTES]
router
  .route("/")
  .get(asyncHandler(membershipController.index))
  .post(asyncHandler(membershipController.addMember));

router.route("/search").get(asyncHandler(membershipController.getMembers));

// router
//   .route("/celebrants")
//   .get(asyncHandler(membershipController.getBirthdayCelebrants));

module.exports = router;
