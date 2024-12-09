const bcrypt = require('bcryptjs');
const Admin = require('../models/admin'); 
const connectDB = require('./db');

const seedAdmin = async () => {
    await connectDB();
    try {
        const email = 'proctorasecure@gmail.com';
        const password = "Ayush@0609";
        const hashedPassword = await bcrypt.hash(password, 10);

        await Admin.findOneAndUpdate(
            { email },
            { email, password: hashedPassword },
            { upsert: true, new: true }
        );
        console.log('Admin Created');
    } catch (error) {
        console.error('Seeding Error:', error);
    }
};

seedAdmin();
