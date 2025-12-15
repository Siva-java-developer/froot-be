const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

require('dotenv').config();

const createSuperAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        
        const existingSuperAdmin = await User.findOne({ role: 'superadmin' });
        if (existingSuperAdmin) {
            console.log('SuperAdmin already exists!');
            process.exit(0);
        }

        const password = 'SuperAdmin@123';
        const hashPassword = await bcrypt.hash(password, 10);

        const superAdmin = new User({
            name: 'Super Admin',
            email: 'superadmin@frootfast.com',
            mobileNumber: '9943431297',
            password: hashPassword,
            role: 'superadmin',
            status: true
        });

        await superAdmin.save();
        console.log('SuperAdmin created successfully!');
        console.log('Email: superadmin@frootfast.com');
        console.log('Password: SuperAdmin@123');
        
    } catch (error) {
        console.error('Error creating SuperAdmin:', error);
    } finally {
        mongoose.connection.close();
    }
};

createSuperAdmin();