const express = require("express");
const router = express.Router();
const {
  createLead,
  getLeads,
  getLeadById
} = require("../controllers/leadController");

router.post("/", createLead);
router.get("/", getLeads);
router.get("/:id", getLeadById);

module.exports = router;
