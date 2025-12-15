const Prebook = require('../models/Prebook');
const Outlet = require('../models/Outlet');
const logger = require('../config/logger');

const createPrebook = async (req, res) => {
    try {
        const { name, number, boxType, date, outletId } = req.body;

        if (!name || !number || !boxType || !date || !outletId) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const outlet = await Outlet.findById(outletId);
        if (!outlet) {
            return res.status(400).json({ error: 'Invalid outlet ID' });
        }

        const prebook = new Prebook({ name, number, boxType, date, outletId });
        await prebook.save();

        logger.info(`Prebook created by: ${name}`);
        res.status(201).json({
            status: true,
            message: 'Prebook created successfully',
            data: prebook
        });
    } catch (error) {
        logger.error('Prebook creation error:', error.message);
        res.status(400).json({ error: error.message });
    }
};

const getPrebooks = async (req, res) => {
    try {
        const prebooks = await Prebook.find()
            .populate('outletId', 'name city')
            .sort({ createdAt: -1 });
        
        res.json({
            status: true,
            message: 'Prebooks retrieved successfully',
            data: prebooks
        });
    } catch (error) {
        logger.error('Get prebooks error:', error.message);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createPrebook, getPrebooks };