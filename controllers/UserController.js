const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const logger = require('../config/logger');
require("dotenv").config();

exports.register = async (req, res) => {
    try {
        const { name, email, mobileNumber, password, role, outletId } = req.body;
        
        if (!password) {
            return res.status(400).json({ error: "Password is required" });
        }
        
        if (req.user.role !== 'superadmin') {
            return res.status(403).json({ error: "Only superadmin can create users" });
        }
        
        const hashPassword = await bcrypt.hash(password, 10);

        const existingUser = await User.findOne({ 
            $or: [{ email }, { name }] 
        });
        if (existingUser) {
            return res.status(400).json({ error: "User with this name or email already exists" });
        }

        if (!['superadmin', 'admin'].includes(role)) {
            return res.status(400).json({ error: "Role must be either 'superadmin' or 'admin'" });
        }

        const superadminCount = await User.countDocuments({ role: 'superadmin' });
        if (role === 'superadmin' && superadminCount >= 1) {
            return res.status(400).json({ error: "Only one superadmin is allowed" });
        }

        const userData = {
            name,
            email,
            mobileNumber,
            password: hashPassword,
            role,
            status: true
        };

        if (role === 'admin' && outletId) {
            userData.outletId = outletId;
        }

        const user = new User(userData);
        await user.save();

        logger.info(`User created: ${user.email} with role ${user.role}`);
        res.status(201).json({
            message: "User created successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                mobileNumber: user.mobileNumber,
                role: user.role,
                outletId: user.outletId
            }
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "Invalid Email or Password" });
        }

        if (user && user.status == false) {
            return res.status(404).json({ error: "Your account is deactivated. Please contact admin." });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(404).json({ error: "Invalid Email or Password" });
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: token
            },

        });
    } catch (err) {
        return res.status(500).json({ error: "Login failed", message: err.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { name, email, mobileNumber, role, outletId, status } = req.body;

        const existingUser = await User.findOne({ 
            $or: [{ email }, { name }],
            _id: { $ne: userId }
        });
        
        if (existingUser) {
            return res.status(400).json({ error: "User with this name or email already exists" });
        }

        if (role && !['superadmin', 'admin'].includes(role)) {
            return res.status(400).json({ error: "Role must be either 'superadmin' or 'admin'" });
        }

        const currentUser = await User.findById(userId);
        if (!currentUser) {
            return res.status(404).json({ error: "User not found" });
        }

        if (role === 'superadmin' && currentUser.role !== 'superadmin') {
            const superadminCount = await User.countDocuments({ role: 'superadmin' });
            if (superadminCount >= 1) {
                return res.status(400).json({ error: "Only one superadmin is allowed" });
            }
        }

        const updateData = { name, email, mobileNumber, role, status };
        if (role === 'admin' && outletId) {
            updateData.outletId = outletId;
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true }
        ).populate('outletId');

        res.status(200).json({
            message: "User updated successfully",
            user: {
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                mobileNumber: updatedUser.mobileNumber,
                role: updatedUser.role,
                outletId: updatedUser.outletId,
                status: updatedUser.status
            }
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

exports.logout = async (req, res) => {
    res.clearCookie("auth_token");
    res.status(200).json({ message: "Logged out successfully" });
};

exports.getUserById = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.findById(userId)
            .select("-password")
            .populate('outletId');

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                mobileNumber: user.mobileNumber,
                role: user.role,
                outletId: user.outletId,
                status: user.status
            }
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.getUser = async (req, res) => {
    try {
        const users = await User.find()
            .select("-password")
            .populate('outletId');
        
        res.status(200).json({ 
            status: true, 
            message: "Users fetched successfully", 
            data: users 
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(400).json({ error: "User id required" });
        }

        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json({ message: "User successfully deleted" });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.user.id;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: "Current password and new password are required" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Current password is incorrect" });
        }

        const hashNewPassword = await bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate(userId, { password: hashNewPassword });

        logger.info(`Password changed for user: ${user.email}`);
        res.status(200).json({
            status: true,
            message: "Password changed successfully"
        });
    } catch (error) {
        logger.error('Change password error:', error.message);
        res.status(500).json({ error: error.message });
    }
};

