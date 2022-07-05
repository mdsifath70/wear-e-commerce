import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        userID: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User',
            required: true,
        },
        products: [
            {
                productId: {
                    type: mongoose.SchemaTypes.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
            },
        ],
        address: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

mongoose.models = {};
const OrderModel = mongoose.model('Order', orderSchema);
export default OrderModel;
