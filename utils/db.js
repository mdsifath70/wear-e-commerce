import mongoose from 'mongoose';

export default function dbConnect() {
    if (mongoose.connections[0].readyState) return;

    mongoose.connect(process.env.MONGO_URI);
    console.log('db connected');
}
