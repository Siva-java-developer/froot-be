const Finance = require('../models/Finance');
const logger = require('../config/logger');

const createFinance = async (req, res) => {
    try {
        const { name, amount, spendBy, description } = req.body;

        if (!name || !amount || !spendBy || !description) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const finance = new Finance({ name, amount, spendBy, description });
        await finance.save();

        logger.info(`Finance record created: ${name}`);
        res.status(201).json({
            status: true,
            message: 'Finance record created successfully',
            data: finance
        });
    } catch (error) {
        logger.error('Finance creation error:', error.message);
        res.status(400).json({ error: error.message });
    }
};

const getFinances = async (req, res) => {
    try {
        const finances = await Finance.find().sort({ createdAt: -1 });
        res.json({
            status: true,
            message: 'Finance records retrieved successfully',
            data: finances
        });
    } catch (error) {
        logger.error('Get finances error:', error.message);
        res.status(500).json({ error: error.message });
    }
};

const getFinanceById = async (req, res) => {
    try {
        const finance = await Finance.findById(req.params.id);
        
        if (!finance) {
            return res.status(404).json({ error: 'Finance record not found' });
        }

        res.json({
            status: true,
            message: 'Finance record retrieved successfully',
            data: finance
        });
    } catch (error) {
        logger.error('Get finance by ID error:', error.message);
        res.status(500).json({ error: error.message });
    }
};

const updateFinance = async (req, res) => {
    try {
        const { name, amount, spendBy, description } = req.body;

        const finance = await Finance.findByIdAndUpdate(
            req.params.id,
            { name, amount, spendBy, description },
            { new: true, runValidators: true }
        );

        if (!finance) {
            return res.status(404).json({ error: 'Finance record not found' });
        }

        logger.info(`Finance record updated: ${finance.name}`);
        res.json({
            status: true,
            message: 'Finance record updated successfully',
            data: finance
        });
    } catch (error) {
        logger.error('Finance update error:', error.message);
        res.status(400).json({ error: error.message });
    }
};

const deleteFinance = async (req, res) => {
    try {
        const finance = await Finance.findByIdAndDelete(req.params.id);
        
        if (!finance) {
            return res.status(404).json({ error: 'Finance record not found' });
        }

        logger.info(`Finance record deleted: ${finance.name}`);
        res.json({
            status: true,
            message: 'Finance record deleted successfully'
        });
    } catch (error) {
        logger.error('Finance delete error:', error.message);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createFinance, getFinances, getFinanceById, updateFinance, deleteFinance };