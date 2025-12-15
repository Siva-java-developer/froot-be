const Contact = require('../models/Contact');
const logger = require('../config/logger');

const createContact = async (req, res) => {
    try {
        const { name, email, number, message } = req.body;

        if (!name || !email || !number || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const contact = new Contact({ name, email, number, message });
        await contact.save();

        logger.info(`Contact created: ${email}`);
        res.status(201).json({
            status: true,
            message: 'Contact message sent successfully',
            data: contact
        });
    } catch (error) {
        logger.error('Contact creation error:', error.message);
        res.status(400).json({ error: error.message });
    }
};

const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json({
            status: true,
            message: 'Contacts retrieved successfully',
            data: contacts
        });
    } catch (error) {
        logger.error('Get contacts error:', error.message);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createContact, getContacts };