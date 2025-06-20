const express = require("express");
const router = express.Router();
const Goal = require("../models/Goal");

// Add Goal
router.post("/", async (req, res) => {
  try {
    const goal = new Goal(req.body);
    await goal.save();
    res.status(201).json(goal);
  } catch (err) {
    res.status(500).json({ error: "Failed to create goal" });
  }
});

// Get Goals by User
router.get("/:userId", async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.params.userId }).sort({ dueDate: 1 });
    res.status(200).json(goals);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch goals" });
  }
});

// Toggle Completion
router.patch("/:id/toggle", async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    goal.completed = !goal.completed;
    await goal.save();
    res.json(goal);
  } catch (err) {
    res.status(500).json({ error: "Failed to toggle goal status" });
  }
});

// Delete Goal
router.delete("/:id", async (req, res) => {
  try {
    await Goal.findByIdAndDelete(req.params.id);
    res.json({ message: "Goal deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete goal" });
  }
});

module.exports = router;
