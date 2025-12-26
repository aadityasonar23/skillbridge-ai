const Exchange = require("../models/Exchange");
const User = require("../models/User");

// CREATE REQUEST
exports.createExchange = async (req, res) => {
  try {
    const { responderId, offeredSkill, requestedSkill } = req.body;

    const exchange = await Exchange.create({
      requester: req.user,
      responder: responderId,
      offeredSkill,
      requestedSkill,
    });

    res.status(201).json(exchange);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ACCEPT REQUEST
exports.acceptExchange = async (req, res) => {
  try {
    const exchange = await Exchange.findById(req.params.id);
    if (!exchange) {
      return res.status(404).json({ message: "Exchange not found" });
    }

    exchange.status = "Accepted";
    await exchange.save();

    res.json(exchange);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// REJECT REQUEST
exports.rejectExchange = async (req, res) => {
  try {
    const exchange = await Exchange.findById(req.params.id);
    if (!exchange) {
      return res.status(404).json({ message: "Exchange not found" });
    }

    exchange.status = "Rejected";
    await exchange.save();

    res.json(exchange);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// COMPLETE REQUEST
exports.completeExchange = async (req, res) => {
  try {
    const exchange = await Exchange.findById(req.params.id);
    if (!exchange) {
      return res.status(404).json({ message: "Exchange not found" });
    }

    exchange.status = "Completed";
    await exchange.save();

    await User.findByIdAndUpdate(exchange.responder, {
      $inc: { trustScore: 0.2 },
    });

    res.json(exchange);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// MY SENT REQUESTS
exports.getMySentRequests = async (req, res) => {
  try {
    const requests = await Exchange.find({ requester: req.user })
      .populate("responder", "name email")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// MY RECEIVED REQUESTS
exports.getMyReceivedRequests = async (req, res) => {
  try {
    const requests = await Exchange.find({ responder: req.user })
      .populate("requester", "name email")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
