const express = require("express");
const router = express.Router();

const requestcontroller = require("../controllers/request.controller");

const authMiddle = require("../middleware/role.middleware");

router.post("/send", authMiddle.authOrganizer, requestcontroller.sendRequest);
router.get("/business",authMiddle.authBusiness,requestcontroller.getBusinessRequests)
router.put("/:id/status",authMiddle.authBusiness,requestcontroller.updateRequestStatus)
router.get("/organizer",authMiddle.authOrganizer,requestcontroller.getOrganizerRequests);
router.post("/generate-proposal",authMiddle.authOrganizer,requestcontroller.generateProposal);

module.exports = router;