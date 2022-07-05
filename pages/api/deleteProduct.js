import dbConnect from '../../middlewares/db';
import ProductModel from '../../models/ProductModel';

async function handler(req, res) {
    if (req.method === 'DELETE') {
        try {
            const { id } = req.body;
            const product = await ProductModel.findByIdAndDelete(id);

            // response
            res.status(200).json({
                message: 'product deleted successfully',
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

export default dbConnect(handler);
