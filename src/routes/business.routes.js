const express = require("express");
const router = express.Router();

const businessConroller = require("../controllers/business.controller");
const authMiddle = require("../middleware/role.middleware");
const authuser = require("../middleware/auth.middleware")


router.post("/create", authMiddle.authBusiness, businessConroller.createBusinessProfile);
router.get("/",authuser,businessConroller.getAllBusinesses);
router.get("/match/:eventId",businessConroller.getMatchedBusinesses);

module.exports = router;