const express = require('express');
const router = express.Router();
const StudyPlan = require('../models/StudyPlan');

// ✅ Create a new study plan
router.post('/', async (req, res) => {
  try {
    const { user, title, subject, description, date } = req.body;

    // Debug log incoming data
    console.log("🔍 Received Study Plan Data:", req.body);

    // Basic validation
    if (!user || !title || !subject || !date) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newPlan = new StudyPlan({
      user,
      title,
      subject,
      description,
      date,
    });

    await newPlan.save();
    res.status(201).json(newPlan);
  } catch (err) {
    console.error("❌ Failed to create study plan:", err);
    res.status(500).json({
      error: 'Failed to create study plan',
      details: err.message,
    });
  }
});

// ✅ Get all plans for a specific user
router.get('/:userId', async (req, res) => {
  try {
    const plans = await StudyPlan.find({ user: req.params.userId }).sort({ date: 1 });
    res.status(200).json(plans);
  } catch (err) {
    console.error("❌ Failed to fetch study plans:", err);
    res.status(500).json({ error: 'Failed to fetch study plans' });
  }
});

// ✅ Delete a study plan by ID
router.delete('/:id', async (req, res) => {
  try {
    await StudyPlan.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Plan deleted successfully' });
  } catch (err) {
    console.error("❌ Delete failed:", err);
    res.status(500).json({ error: 'Delete failed' });
  }
});

module.exports = router;
