import mongoose from 'mongoose';

export default function dbConnect(handler) {
    return (req, res) => {
        if (mongoose.connections[0].readyState) return handler(req, res);

        mongoose
            .connect(process.env.MONGO_URI)
            .then(() => {
                return handler(req, res);
            })
            .catch((err) => {
                console.log(err);
            });
    };
}
