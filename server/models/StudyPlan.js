const mongoose = require('mongoose');

const StudyPlanSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  subject: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
});

module.exports = mongoose.model('StudyPlan', StudyPlanSchema);
