const eventModel = require("../models/event.model");

// Create Event
async function createEvent(req, res) {
  try {
    const {
      title,
      description,
      category,
      date,
      location,
      audienceSize,
      requiredAmount
    } = req.body;

    const event = await eventModel.create({
      title,
      description,
      category,
      date,
      location,
      audienceSize,
      requiredAmount,
      organizer: req.user.id
    });

    res.status(201).json({
      message: "Event created successfully",
      event
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}

async function getMyEvents(req, res) {
  try {
    const events = await eventModel.find({
      organizer: req.user.id
    });

    res.status(200).json(events);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}

module.exports = { createEvent,getMyEvents};