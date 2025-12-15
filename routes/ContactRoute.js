const express = require('express');
const router = express.Router();
const { createContact, getContacts } = require('../controllers/ContactController');
const authMiddleware = require('../middleware/authMiddleware');
const superAdminMiddleware = require('../middleware/superAdminMiddleware');

/**
 * @swagger
 * /api/contact:
 *   post:
 *     tags: [Contact Us]
 *     summary: Create contact message (Public)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       201:
 *         description: Contact message sent successfully
 *       400:
 *         description: Validation error
 *   get:
 *     tags: [Contact Us]
 *     summary: Get all contact messages (SuperAdmin only)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of contact messages
 *       403:
 *         description: Access denied
 */
router.post('/contact', createContact);
router.get('/contact', authMiddleware, superAdminMiddleware, getContacts);

module.exports = router;