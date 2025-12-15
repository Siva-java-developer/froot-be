const express = require('express');
const router = express.Router();
const { createEvent, getEvents } = require('../controllers/EventController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/event:
 *   post:
 *     tags: [Event Management]
 *     summary: Create event (Public)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       201:
 *         description: Event created successfully
 *   get:
 *     tags: [Event Management]
 *     summary: Get all events
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of events
 */
router.post('/event', createEvent);
router.get('/event', authMiddleware, getEvents);

module.exports = router;

      