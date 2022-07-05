import mongoose from 'mongoose';
import ProductItem from '../components/ProductItem';
import Products from '../components/Products';
import ProductModel from '../models/ProductModel';

// Fetch stickers products from db
export async function getServerSideProps() {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI);
    }
    const products = JSON.parse(JSON.stringify(await ProductModel.find({ category: 'stickers' })));

    let stickers = {};
    for (const stick of products) {
        if (stickers[stick.title]) {
            stickers[stick.title].sizes.push(stick.size);
            stickers[stick.title].colors.push(stick.color);
        } else {
            if (stick.inStock > 0) {
                stickers[stick.title] = JSON.parse(JSON.stringify(stick));
                stickers[stick.title].sizes = [stick.size];
                stickers[stick.title].colors = [stick.color];
                delete stickers[stick.title].color;
                delete stickers[stick.title].size;
            }
        }
    }

    return {
        props: { products: stickers },
    };
}

export default function Stickers({ products }) {
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
