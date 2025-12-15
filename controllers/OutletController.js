const Outlet = require("../models/Outlet");
const logger = require('../config/logger');

exports.createOutlet = async (req, res) => {
    try {
        const { name, city } = req.body;
        
        const existingOutlet = await Outlet.findOne({ name });
        if (existingOutlet) {
            return res.status(400).json({ error: "Outlet name already exists" });
        }
        
        const outlet = new Outlet({ name, city });
        await outlet.save();

        logger.info(`Outlet created: ${outlet.name}`);
        res.status(201).json({
            message: "Outlet created successfully",
            outlet
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getOutlets = async (req, res) => {
    try {
        const outlets = await Outlet.find();
        res.status(200).json({ 
            status: true, 
            message: "Outlets fetched successfully", 
            data: outlets 
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getOutletById = async (req, res) => {
    try {
        const outlet = await Outlet.findById(req.params.id);
        
        if (!outlet) {
            return res.status(404).json({ error: "Outlet not found" });
        }

        res.status(200).json({ outlet });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateOutlet = async (req, res) => {
    try {
        const { name, city } = req.body;
        
        const existingOutlet = await Outlet.findOne({ name });
        if (existingOutlet && existingOutlet._id.toString() !== req.params.id) {
            return res.status(400).json({ error: "Outlet name already exists" });
        }
        
        const outlet = await Outlet.findByIdAndUpdate(
            req.params.id,
            { name, city },
            { new: true }
        );

        if (!outlet) {
            return res.status(404).json({ error: "Outlet not found" });
        }

        res.status(200).json({
            message: "Outlet updated successfully",
            outlet
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteOutlet = async (req, res) => {
    try {
        const outlet = await Outlet.findByIdAndDelete(req.params.id);
        
        if (!outlet) {
            return res.status(404).json({ error: "Outlet not found" });
        }

        res.status(200).json({ message: "Outlet deleted successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};