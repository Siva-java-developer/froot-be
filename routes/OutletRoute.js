const express = require('express');
const router = express.Router();
const { createOutlet, getOutlets, getOutletById, updateOutlet, deleteOutlet } = require('../controllers/OutletController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/outlet:
 *   post:
 *     tags: [Outlet Management]
 *     summary: Create outlet
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Outlet'
 *     responses:
 *       201:
 *         description: Outlet created successfully
 *   get:
 *     tags: [Outlet Management]
 *     summary: Get all outlets
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of outlets
 */
router.post('/outlet', authMiddleware, createOutlet);
router.get('/outlet', authMiddleware, getOutlets);

/**
 * @swagger
 * /api/outlet/{id}:
 *   get:
 *     tags: [Outlet Management]
 *     summary: Get outlet by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Outlet details
 *   put:
 *     tags: [Outlet Management]
 *     summary: Update outlet
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Outlet'
 *     responses:
 *       200:
 *         description: Outlet updated successfully
 *   delete:
 *     tags: [Outlet Management]
 *     summary: Delete outlet
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Outlet deleted successfully
 */
router.get('/outlet/:id', authMiddleware, getOutletById);
router.put('/outlet/:id', authMiddleware, updateOutlet);
router.delete('/outlet/:id', authMiddleware, deleteOutlet);

module.exports = router;