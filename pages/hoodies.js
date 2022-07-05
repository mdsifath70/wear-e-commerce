import mongoose from 'mongoose';
import ProductItem from '../components/ProductItem';
import Products from '../components/Products';
import ProductModel from '../models/ProductModel';

// Fetch hoodies products from db
export async function getServerSideProps() {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI);
    }
    const products = JSON.parse(JSON.stringify(await ProductModel.find({ category: 'hoodies' })));

    let hoodies = {};
    for (const hood of products) {
        if (hoodies[hood.title]) {
            hoodies[hood.title].sizes.push(hood.size);
            hoodies[hood.title].colors.push(hood.color);
        } else {
            if (hood.inStock > 0) {
                hoodies[hood.title] = JSON.parse(JSON.stringify(hood));
                hoodies[hood.title].sizes = [hood.size];
                hoodies[hood.title].colors = [hood.color];
                delete hoodies[hood.title].color;
                delete hoodies[hood.title].size;
            }
        }
    }

    return {
        props: { products: hoodies },
    };
}

export default function Hoodies({ products }) {
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
