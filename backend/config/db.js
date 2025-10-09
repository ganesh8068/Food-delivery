import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // mongoose.connection.on('connected', () => {
    //   console.log('✅ Connected to MongoDB');
    // });

    // mongoose.connection.on('error', (err) => {
    //   console.error('❌ MongoDB connection error:', err);
    // });

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
};

export default connectDB;
