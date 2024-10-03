const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
    try {
        // No need for useNewUrlParser or useUnifiedTopology anymore
        await mongoose.connect(db);

        console.log('MongoDB Connected...');
    } catch (err) {
        console.error('MongoDB Connection Error:', err.message, err);
        console.error('MongoDB Connection Error:', err);
console.log('Error Cause:', err.cause); // Check for more details about the cause

        process.exit(1); // Exit process with failure

    }
};

module.exports = connectDB;
