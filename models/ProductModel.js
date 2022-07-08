import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        img: {
            type: String,
            default: '/img-placeholder.jpg',
        },
        imgAlt: String,
        inStock: {
            type: Number,
            default: 1,
        },
        category: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        size: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        colorName: String,
        slug: {
            type: String,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: true,
    }
);

const ProductModel = mongoose.models.Product || mongoose.model('Product', productSchema);
export default ProductModel;
