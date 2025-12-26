const mongoose = require("mongoose");

const exchangeSchema = new mongoose.Schema(
  {
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    responder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    offeredSkill: {
      type: String,
      required: true,
    },
    requestedSkill: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Requested", "Accepted", "Completed", "Rejected"],
      default: "Requested",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Exchange", exchangeSchema);
