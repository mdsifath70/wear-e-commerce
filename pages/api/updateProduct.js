import dbConnect from '../../middlewares/db';
import ProductModel from '../../models/ProductModel';

async function handler(req, res) {
    if (req.method === 'PUT') {
        try {
            const {
                title,
                price,
                img,
                inStock,
                category,
                desc,
                size,
                color,
                colorName,
                slug,
            } = req.body;

            const product = await ProductModel.findByIdAndUpdate(
                req.body.id,
                {
                    title,
                    price,
                    img,
                    inStock,
                    category,
                    desc,
                    size,
                    color,
                    colorName,
                    slug,
                },
                {
                    new: true,
                }
            );

            // response
            res.status(200).json({
                message: 'product updated successfully',
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
