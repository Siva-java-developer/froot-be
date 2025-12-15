const express = require('express');
const router = express.Router();
const { createReview, getReviews } = require('../controllers/ReviewController');
const authMiddleware = require('../middleware/authMiddleware');
const superAdminMiddleware = require('../middleware/superAdminMiddleware');

/**
 * @swagger
 * /api/review:
 *   post:
 *     tags: [Reviews]
 *     summary: Submit review (Public)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       201:
 *         description: Review submitted successfully
 *       400:
 *         description: Validation error
 *   get:
 *     tags: [Reviews]
 *     summary: Get all reviews (SuperAdmin only)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of reviews
 *       403:
 *         description: Access denied
 */
router.post('/review', createReview);
router.get('/review', authMiddleware, superAdminMiddleware, getReviews);

module.exports = router;