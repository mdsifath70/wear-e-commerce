import mongoose from 'mongoose';
import ProductItem from '../components/ProductItem';
import Products from '../components/Products';
import ProductModel from '../models/ProductModel';

// Fetch mugs products from db
export async function getServerSideProps() {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI);
    }
    const products = JSON.parse(JSON.stringify(await ProductModel.find({ category: 'mugs' })));

    let mugs = {};
    for (const mug of products) {
        if (mugs[mug.title]) {
            mugs[mug.title].sizes.push(mug.size);
            mugs[mug.title].colors.push(mug.color);
        } else {
            if (mug.inStock > 0) {
                mugs[mug.title] = JSON.parse(JSON.stringify(mug));
                mugs[mug.title].sizes = [mug.size];
                mugs[mug.title].colors = [mug.color];
                delete mugs[mug.title].color;
                delete mugs[mug.title].size;
            }
        }
    }

    return {
        props: { products: mugs },
    };
}

export default function Mugs({ products }) {
    if (Object.keys(products).length === 0) {
        return (
            <div className="container mx-auto px-4 mt-10">
                <h2 className="text-lg text-center">Sorry, there is no product available</h2>
            </div>
        );
    }

    return (
        <Products>
            {Object.keys(products).map((productKey) => {
                return <ProductItem key={productKey} products={products} productKey={productKey} />;
            })}
        </Products>
    );
}
