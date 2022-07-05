import mongoose from 'mongoose';
import ProductItem from '../components/ProductItem';
import Products from '../components/Products';
import ProductModel from '../models/ProductModel';

// Fetch tshirts products from db
export async function getServerSideProps() {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI);
    }
    const products = JSON.parse(JSON.stringify(await ProductModel.find({ category: 'tshirt' })));

    let tShirts = {};
    for (const tShirt of products) {
        if (tShirts[tShirt.title]) {
            tShirts[tShirt.title].sizes.push(tShirt.size);
            tShirts[tShirt.title].colors.push(tShirt.color);
        } else {
            if (tShirt.inStock > 0) {
                tShirts[tShirt.title] = JSON.parse(JSON.stringify(tShirt));
                tShirts[tShirt.title].sizes = [tShirt.size];
                tShirts[tShirt.title].colors = [tShirt.color];
                delete tShirts[tShirt.title].color;
                delete tShirts[tShirt.title].size;
            }
        }
    }

    return {
        props: { products: tShirts },
    };
}

export default function Tshirts({ products }) {
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
