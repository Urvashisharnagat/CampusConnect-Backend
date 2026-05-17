const businessModel = require("../models/business.model");
const eventModel = require("../models/event.model");

async function createBusinessProfile(req, res) {
  try {
    const {
      businessName,
      category,
      location,
      description,
      targetAudience
    } = req.body;

    const business = await businessModel.create({
      user: req.user.id,
      businessName,
      category,
      location,
      description,
      targetAudience
    });

    res.status(201).json({
      message: "Business profile created",
      business
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}

async function getAllBusinesses(req, res) {
  try {
    const businesses = await businessModel.find()
      .populate("user", "name email");

    res.status(200).json(businesses);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}


async function getMatchedBusinesses(req, res) {
  try {
    const event = await eventModel.findById(
      req.params.eventId
    );

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    const businesses = await businessModel.find({
      category: event.category
    });

    res.status(200).json({
      eventCategory: event.category,
      matchedBusinesses: businesses
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}

module.exports = {
  createBusinessProfile,
  getAllBusinesses,
  getMatchedBusinesses
};