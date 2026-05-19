const express = require("express");
const router = express.Router();

const businessController = require("../controllers/business.controller");
const authMiddle = require("../middleware/role.middleware");


router.post("/create", authMiddle.authBusiness, businessController.createBusinessProfile);
router.get("/",authMiddle.authBusiness,businessController.getAllBusinesses);
router.get("/match/:eventId",authMiddle.authOrganizer,businessController.getMatchedBusinesses);
router.get("/ai-match/:eventId",authMiddle.authOrganizer,businessController.getAIMatchedBusinesses);

module.exports = router;