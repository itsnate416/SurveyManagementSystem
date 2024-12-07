const Survey = require('../models/Survey');

const createSurvey = async (req, res) => {
    const { title, description, questions } = req.body;
    try {
        const survey = new Survey({ title, description, questions });
        await survey.save();
        res.status(201).json({ message: 'Survey created successfully', survey });
    } catch (error) {
        res.status(500).json({ message: 'Error creating survey', error });
    }
};

const getSurveys = async (req, res) => {
    try {
        const surveys = await Survey.find();
        res.status(200).json(surveys);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching surveys', error });
    }
};

const getSurveyById = async (req, res) => {
    const { id } = req.params;
    try {
        const survey = await Survey.findById(id);
        if (!survey) return res.status(404).json({ message: 'Survey not found' });
        res.status(200).json(survey);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching survey', error });
    }
};

const updateSurvey = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const survey = await Survey.findByIdAndUpdate(id, updates, { new: true });
        if (!survey) return res.status(404).json({ message: 'Survey not found' });
        res.status(200).json({ message: 'Survey updated successfully', survey });
    } catch (error) {
        res.status(500).json({ message: 'Error updating survey', error });
    }
};

const deleteSurvey = async (req, res) => {
    const { id } = req.params;
    try {
        const survey = await Survey.findByIdAndDelete(id);
        if (!survey) return res.status(404).json({ message: 'Survey not found' });
        res.status(200).json({ message: 'Survey deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting survey', error });
    }
};

module.exports = {
    createSurvey,
    getSurveys,
    getSurveyById,
    updateSurvey,
    deleteSurvey
};
