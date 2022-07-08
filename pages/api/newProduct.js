import ProductModel from '../../models/ProductModel';
import dbConnect from '../../utils/db';

async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            dbConnect();

            const newProduct = await ProductModel(req.body);
            const product = await newProduct.save();

            // response
            res.status(200).json({
                message: 'new product added successfully',
                product,
            });
        } catch (err) {
            res.status(500).json({
                error: err,
            });
        }
    } else {
        res.status(400).json({
            error: 'This request not allowed',
        });
    }
}

export default handler;
