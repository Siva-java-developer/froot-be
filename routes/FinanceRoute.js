const express = require('express');
const router = express.Router();
const { createFinance, getFinances, getFinanceById, updateFinance, deleteFinance } = require('../controllers/FinanceController');
const authMiddleware = require('../middleware/authMiddleware');
const superAdminMiddleware = require('../middleware/superAdminMiddleware');

/**
 * @swagger
 * /api/finance:
 *   post:
 *     tags: [Finance Management]
 *     summary: Create finance record (SuperAdmin only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Finance'
 *     responses:
 *       201:
 *         description: Finance record created successfully
 *       403:
 *         description: Access denied
 *   get:
 *     tags: [Finance Management]
 *     summary: Get all finance records (SuperAdmin only)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of finance records
 *       403:
 *         description: Access denied
 */
router.post('/finance', authMiddleware, superAdminMiddleware, createFinance);
router.get('/finance', authMiddleware, superAdminMiddleware, getFinances);

/**
 * @swagger
 * /api/finance/{id}:
 *   get:
 *     tags: [Finance Management]
 *     summary: Get finance record by ID (SuperAdmin only)
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
 *         description: Finance record details
 *       404:
 *         description: Finance record not found
 *       403:
 *         description: Access denied
 *   put:
 *     tags: [Finance Management]
 *     summary: Update finance record (SuperAdmin only)
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
 *             $ref: '#/components/schemas/Finance'
 *     responses:
 *       200:
 *         description: Finance record updated successfully
 *       404:
 *         description: Finance record not found
 *       403:
 *         description: Access denied
 *   delete:
 *     tags: [Finance Management]
 *     summary: Delete finance record (SuperAdmin only)
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
 *         description: Finance record deleted successfully
 *       404:
 *         description: Finance record not found
 *       403:
 *         description: Access denied
 */
router.get('/finance/:id', authMiddleware, superAdminMiddleware, getFinanceById);
router.put('/finance/:id', authMiddleware, superAdminMiddleware, updateFinance);
router.delete('/finance/:id', authMiddleware, superAdminMiddleware, deleteFinance);

module.exports = router;