const businessModel = require("../models/business.model");
const eventModel = require("../models/event.model");
const model = require("../utils/aiHelper");

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

async function getAIMatchedBusinesses(req, res) {
  try {
    const event = await eventModel.findById(req.params.eventId);

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    const businesses = await businessModel.find();

    const prompt = `
Suggest the best matching sponsors for this event.

Event Details:
Title: ${event.title}
Category: ${event.category}
Location: ${event.location}
Audience Size: ${event.audienceSize}
Description: ${event.description}

Available Businesses:
${JSON.stringify(businesses)}

Return top matching businesses with reasons.
`;

    const result = await model.generateContent(prompt);

    const response = result.response.text();

    res.status(200).json({
      aiRecommendations: response
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
  getMatchedBusinesses,
  getAIMatchedBusinesses
};