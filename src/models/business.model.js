const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    businessName: {
      type: String,
      required: true
    },

    category: {
      type: String,
      required: true
    },

    location: {
      type: String,
      required: true
    },

    description: {
      type: String
    },

    targetAudience: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const businessModel = mongoose.model(
  "Business",
  businessSchema
);

module.exports = businessModel