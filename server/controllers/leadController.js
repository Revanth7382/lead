const Lead = require("../models/Lead");
const axios = require("axios");

exports.createLead = async (req, res) => {
  try {
    const lead = await Lead.create(req.body);

    // Webhook Payload
    const payload = {
      name: lead.name,
      email: lead.email,
      source: lead.source,
      created_at: lead.created_at
    };

    let webhookStatus = "Success";

    try {
      await axios.post(process.env.WEBHOOK_URL, payload);
    } catch (error) {
      webhookStatus = "Failed";
      console.error("Webhook error:", error.message);
    }

    res.status(201).json({
      success: true,
      data: lead,
      webhook: webhookStatus
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

exports.getLeads = async (req, res) => {
  const leads = await Lead.find().sort({ created_at: -1 });
  res.json(leads);
};

exports.getLeadById = async (req, res) => {
  const lead = await Lead.findById(req.params.id);
  res.json(lead);
};
