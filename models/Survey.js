const mongoose = require('mongoose');

const SurveySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    questions: [
        {
            questionText: { type: String, required: true },
            options: [String], // Optional for multiple-choice questions
            type: { type: String, enum: ['text', 'multiple-choice'], default: 'text' }
        }
    ],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Survey', SurveySchema);
