import ProductModel from '../../models/ProductModel';
import dbConnect from '../../utils/db';

async function handler(req, res) {
    if (req.method === 'DELETE') {
        try {
            dbConnect();

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

export default handler;
