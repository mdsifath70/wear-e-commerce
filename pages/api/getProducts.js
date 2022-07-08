import ProductModel from '../../models/ProductModel';
import dbConnect from '../../utils/db';

async function handler(req, res) {
    dbConnect();
    const products = await ProductModel.find();

    res.status(200).json(products);
}

export default handler;
