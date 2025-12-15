const express = require('express');
const router = express.Router();
const { createPrebook, getPrebooks } = require('../controllers/PrebookController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/prebook:
 *   post:
 *     tags: [Prebook]
 *     summary: Create prebook (Public)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Prebook'
 *     responses:
 *       201:
 *         description: Prebook created successfully
 *       400:
 *         description: Validation error
 *   get:
 *     tags: [Prebook]
 *     summary: Get all prebooks (Auth required)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of prebooks
 *       401:
 *         description: Authentication required
 */
router.post('/prebook', createPrebook);
router.get('/prebook', authMiddleware, getPrebooks);

module.exports = router;