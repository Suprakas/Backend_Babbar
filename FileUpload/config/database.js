const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('DB connection is successful');
    } catch (err) {
        console.error('DB connection failed:', err);
        process.exit(1);
    }
};

module.exports = dbConnect;
