const express = require('express')
const eventController = require('../controllers/event.controller')
const authMiddle = require('../middleware/role.middleware')


const router = express.Router()


router.post('/create-event',authMiddle.authOrganizer,eventController.createEvent)
router.get("/my-events", authMiddle.authOrganizer, eventController.getMyEvents);
router.get("/all",eventController.getAllEvents)

module.exports= router