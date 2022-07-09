import Image from 'next/image';
import Link from 'next/link';

export default function ProductItem({ products, productKey }) {
    const { category, price, sizes, colors, img, imgAlt, slug } = products[productKey];

    const newSizes = [...new Set(sizes)];

    return (
        <div className="p-4 border shadow-lg rounded">
            <Link href={`/product/${slug}`}>
                <a>
                    <div className="relative h-56 rounded overflow-hidden">
                        <Image src={img} alt={imgAlt || productKey} layout="fill" objectFit="contain" />
                    </div>
                    <div className="mt-4 space-y-1">
                        <h5 className="text-gray-500 text-xs tracking-widest mb-1 capitalize">{category}</h5>
                        <h1 className="text-gray-900 text-lg font-medium">{productKey}</h1>
                        <p>${price}</p>
                        <p className="text-sm space-x-2">
                            {newSizes.map((size, i) => (
                                <span key={i}>
                                    {size}
                                    {i !== newSizes.length - 1 && <>&#x2c;</>}
                                </span>
                            ))}
                        </p>
                        <div className="text-sm space-x-2">
                            {colors.map((color, i) => (
                                <span
                                    key={i}
                                    className={`inline-block w-4 h-4 rounded-full`}
                                    style={{
                                        backgroundColor: color,
                                    }}
                                ></span>
                            ))}
                        </div>
                    </div>
                </a>
            </Link>
        </div>
    );
}
