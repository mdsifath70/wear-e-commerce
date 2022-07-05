import dbConnect from '../../middlewares/db';
import ProductModel from '../../models/ProductModel';

async function handler(req, res) {
    const products = await ProductModel.find();

    res.status(200).json(products);
}

export default dbConnect(handler);
