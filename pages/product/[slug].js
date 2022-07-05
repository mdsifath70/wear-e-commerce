import mongoose from 'mongoose';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../../components/Button';
import CartCounterBtn from '../../components/CartCounterBtn';
import Input from '../../components/Input';
import { useCartContext } from '../../contexts/CartContext';
import ProductModel from '../../models/ProductModel';

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        mongoose.connect(process.env.MONGO_URI);
    }
    const product = await ProductModel.findOne({ slug: context.params.slug });
    const allProducts = await ProductModel.find({ title: product.title });

    // Variants
    let variants = {};
    for (const pro of allProducts) {
        if (variants[pro.color]) {
            if (pro.inStock > 0) {
                variants[pro.color][pro.size] = { slug: pro.slug };
            }
        } else {
            if (pro.inStock > 0) {
                variants[pro.color] = {};
                variants[pro.color][pro.size] = { slug: pro.slug };
            }
        }
    }

    // Sizes
    let sizes = [];
    Object.keys(variants).map((variant) => {
        Object.keys(variants[variant]).map((size) => {
            sizes.push(size);
        });
    });

    return {
        props: {
            product: JSON.parse(JSON.stringify(product)),
            variants,
            sizes: [...new Set(sizes)],
        },
    };
}

export default function Slug({ product, variants, sizes }) {
    const [pinCode, setPinCode] = useState('');
    const [isService, setIsService] = useState(false);
    const [isServiceVisible, setIsServiceVisible] = useState(false);
    const { addToCart, cart, buyNow } = useCartContext();
    const [currentSize, setCurrentSize] = useState(product.size);
    const router = useRouter();
    const { slug } = router.query;

    const checkServiceAbility = async (e) => {
        e.preventDefault();
        const pins = await fetch('http://localhost:3000/api/pinCodes');
        const { pinCodes } = await pins.json();
        if (pinCodes.includes(Number(pinCode))) {
            setIsService(true);
        } else {
            setIsService(false);
        }
        setIsServiceVisible(true);
    };

    const selectOnchangeHandler = (e) => {
        setCurrentSize(e.target.value);

        let slugsArr = [];
        Object.keys(variants).map((va) => {
            Object.keys(variants[va]).map((si) => {
                if (e.target.value === si) {
                    slugsArr.push(variants[va][si].slug);
                }
            });
        });
        refresher(slugsArr[0]);
    };

    const refresher = (slug) => {
        router.push(`/product/${slug}`);
    };

    // destructure
    const { title, price, img, desc, category, size, color, colorName } = product;

    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container container__space py-10 mx-auto">
                <div className="lg:w-4/5 mx-auto grid lg:grid-cols-2">
                    <div className="relative h-[58vw] sm:h-[45vw] md:h-[36vw] lg:h-auto">
                        <div className="absolute inset-4 lg:inset-5">
                            <Image
                                alt="ecommerce"
                                src={img}
                                layout="fill"
                                objectFit="contain"
                                blurDataURL="/img-placeholder.jpg"
                                placeholder="blur"
                            />
                        </div>
                    </div>
                    <div className="lg:pl-10 mt-6 lg:mt-0">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest capitalize">{category}</h2>
                        <h1 className="text-gray-900 text-2xl title-font font-medium mt-1 mb-3">
                            {title} ({currentSize} &#47; {colorName || color})
                        </h1>
                        <p className="leading-relaxed">{desc}</p>
                        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                            <div className="flex">
                                <span className="mr-3">Color</span>
                                <div className="space-x-3">
                                    {Object.keys(variants).map((vClrKey, i) => {
                                        return Object.keys(variants[vClrKey]).map((size) => {
                                            return (
                                                size === currentSize && (
                                                    <button
                                                        key={i}
                                                        onClick={() => refresher(variants[vClrKey][currentSize].slug)}
                                                        className={`border-2 border-gray-300 rounded-full w-5 h-5 focus:outline-none ${
                                                            slug === variants[vClrKey][currentSize].slug ? 'ring' : ''
                                                        } ring-indigo-500 ring-offset-2`}
                                                        style={{
                                                            backgroundColor: vClrKey,
                                                        }}
                                                    ></button>
                                                )
                                            );
                                        });
                                    })}
                                </div>
                            </div>
                            <div className="flex ml-6 items-center">
                                <span className="mr-3">Size</span>
                                <div className="relative">
                                    <select
                                        value={currentSize}
                                        onChange={selectOnchangeHandler}
                                        className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                                    >
                                        {sizes.map((size, i) => (
                                            <option key={i}>{size}</option>
                                        ))}
                                    </select>
                                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                        <svg
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="w-4 h-4"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M6 9l6 6 6-6"></path>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex">
                            <span className="title-font font-medium text-2xl text-gray-900">${price}</span>

                            <div className="flex gap-4 ml-auto">
                                <Button
                                    onClick={() => {
                                        buyNow(slug, title, 1, price, size, color, colorName);
                                    }}
                                >
                                    Buy now
                                </Button>
                                {cart[slug] ? (
                                    <CartCounterBtn itemKey={slug} qty={cart[slug].qty} />
                                ) : (
                                    <Button onClick={() => addToCart(slug, title, 1, price, size, color, colorName)}>
                                        Add to cart
                                    </Button>
                                )}
                            </div>
                        </div>
                        <form className="flex gap-x-4 mt-4" onSubmit={checkServiceAbility}>
                            <label className="block">
                                <Input
                                    type="number"
                                    name="pinCode"
                                    placeholder="Enter pin code"
                                    value={pinCode}
                                    onChange={(e) => setPinCode(e.target.value)}
                                />
                            </label>
                            <Button type="submit">Check</Button>
                        </form>
                        {isServiceVisible &&
                            (isService ? (
                                <p className="text-green-600 mt-3">Yah! This pincode is serviceable</p>
                            ) : (
                                <p className="text-red-500 mt-3">Sorry! we do not deliver to this pincode yet.</p>
                            ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
