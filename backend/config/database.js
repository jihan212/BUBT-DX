const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bubt_career_board', {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
		
		// Handle connection events
		mongoose.connection.on('error', (err) => {
			console.error(`❌ MongoDB connection error: ${err}`);
		});

		mongoose.connection.on('disconnected', () => {
			console.warn('⚠️ MongoDB disconnected');
		});

		// Graceful shutdown
		process.on('SIGINT', async () => {
			await mongoose.connection.close();
			console.log('MongoDB connection closed due to app termination');
			process.exit(0);
		});

		return conn;
	} catch (error) {
		console.error(`❌ MongoDB connection error: ${error.message}`);
		process.exit(1);
	}
};

module.exports = connectDB;

