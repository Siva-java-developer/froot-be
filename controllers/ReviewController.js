const Review = require('../models/Review');
const logger = require('../config/logger');

const createReview = async (req, res) => {
    try {
        const { name, number, rating, reviewText } = req.body;

        if (!name || !number || !rating || !reviewText) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const review = new Review({ name, number, rating, reviewText });
        await review.save();

        logger.info(`Review created by: ${name}`);
        res.status(201).json({
            status: true,
            message: 'Review submitted successfully',
            data: review
        });
    } catch (error) {
        logger.error('Review creation error:', error.message);
        res.status(400).json({ error: error.message });
    }
};

const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 });
        res.json({
            status: true,
            message: 'Reviews retrieved successfully',
            data: reviews
        });
    } catch (error) {
        logger.error('Get reviews error:', error.message);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createReview, getReviews };