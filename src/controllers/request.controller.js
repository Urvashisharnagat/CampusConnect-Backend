const requestModel = require("../models/sponsorshipRequest.model");
const eventModel = require("../models/event.model");
const businessModel = require("../models/business.model");

async function sendRequest(req, res) {
  try {
    const { eventId, businessId } = req.body;

    const request = await requestModel.create({
      event: eventId,
      organizer: req.user.id,
      business: businessId
    });

    res.status(201).json({
      message: "Sponsorship request sent successfully",
      request
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}

async function getBusinessRequests(req, res) {
  try {
    const requests = await requestModel
      .find({ business: req.user.id })
      .populate("event")
      .populate("organizer", "name email");

    res.status(200).json(requests);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}

async function updateRequestStatus(req, res) {
  try {
    const { status } = req.body;

    const request = await requestModel.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.status(200).json({
      message: "Request updated successfully",
      request
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}

async function getOrganizerRequests(req, res) {
  try {
    const requests = await requestModel
      .find({ organizer: req.user.id })
      .populate("event")
      .populate("business", "name email");

    res.status(200).json(requests);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}

async function generateProposal(req, res) {
  try {
    const { eventId, businessId } = req.body;

    const event = await eventModel.findById(eventId);
    const business = await businessModel.findById(businessId);

    if (!event || !business) {
      return res.status(404).json({
        message: "Event or Business not found"
      });
    }

    const proposal = `
Dear ${business.businessName},

We are organizing "${event.title}" on ${event.date.toDateString()} at ${event.location}.

This event is expected to reach ${event.audienceSize} participants.

We invite your organization to sponsor this event with ₹${event.requiredAmount} and gain visibility among students.

Regards,
CampusConnect Organizer
`;

    res.status(200).json({
      proposal
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}

module.exports = { sendRequest,getBusinessRequests, updateRequestStatus,getOrganizerRequests,generateProposal };