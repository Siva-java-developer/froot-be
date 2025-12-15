const Event = require("../models/Event");
const logger = require('../config/logger');

exports.createEvent = async (req, res) => {
    try {
        const { name, email, feedback, greetings } = req.body;
        
        const event = new Event({ name, email, feedback, greetings });
        await event.save();

        logger.info(`Event created by: ${event.email}`);
        res.status(201).json({
            message: "Event created successfully",
            event
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json({ 
            status: true, 
            message: "Events fetched successfully", 
            data: events 
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};