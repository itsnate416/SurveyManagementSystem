const express = require('express');
const {
    createSurvey,
    getSurveys,
    getSurveyById,
    updateSurvey,
    deleteSurvey
} = require('../controllers/surveyController');

const router = express.Router();

router.post('/', createSurvey);
router.get('/', getSurveys);
router.get('/:id', getSurveyById);
router.put('/:id', updateSurvey);
router.delete('/:id', deleteSurvey);

module.exports = router;
