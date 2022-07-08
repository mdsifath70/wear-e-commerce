import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ContextsProvider from './ContextsProvider';
import Footer from './Footer';
import Header from './Header';

export default function Layout({ children }) {
    const [cart, setCart] = useState({});
    const [buyNowCart, setBuyNowCart] = useState({});
    const [subTotal, setSubTotal] = useState(0);
    const [subTotalBuy, setSubTotalBuy] = useState(0);
    const router = useRouter();

    useEffect(() => {
        try {
            const getCart = JSON.parse(localStorage.getItem('cart'));
            if (getCart) {
                setCart(getCart);
                getSubTotal(getCart);
            }
            const getBuyNowCart = JSON.parse(localStorage.getItem('buyNow'));
            if (getBuyNowCart) {
                setBuyNowCart(getBuyNowCart);
                getSubTotal(getBuyNowCart, 'BUY_NOW');
            }
        } catch {
            localStorage.removeItem('cart');
            localStorage.removeItem('buyNow');
        }
    }, []);

    const addToCart = (itemSlug, title, qty, price, size, variant, colorName, type) => {
        let newCart;
        if (type === 'BUY_NOW') {
            newCart = { ...buyNowCart };
        } else {
            newCart = { ...cart };
        }

        if (newCart[itemSlug]) {
            newCart[itemSlug].qty += qty || 1;
        } else {
            newCart[itemSlug] = { title, qty, price, size, variant, colorName };
            if (type !== 'BUY_NOW') toast.success('Product added in cart', { position: 'top-center' });
        }

        // Update cart state && update local storage
        if (type === 'BUY_NOW') {
            setBuyNowCart(newCart);
        } else {
            setCart(newCart);
        }
        getSubTotal(newCart, type);
        saveCart(newCart, type);
    };

    const buyNow = (itemSlug, title, qty, price, size, variant, colorName) => {
        let newCart = { ...buyNowCart };

        if (newCart[itemSlug]) {
            setTimeout(() => {
                toast.error('Already exists in buy now cart!');
            }, 50);
        } else {
            newCart[itemSlug] = { title, qty, price, size, variant, colorName };
            saveCart(newCart, 'BUY_NOW');
            setBuyNowCart(newCart);
            getSubTotal(newCart, 'BUY_NOW');
            setTimeout(() => {
                toast.success('Product Added in buy now cart');
            }, 50);
        }

        // Update cart state && update local storage
        router.push('/checkout');
    };

    const removeToCart = (itemSlug, type) => {
        let newCart;
        if (type === 'BUY_NOW') {
            newCart = { ...buyNowCart };
        } else {
            newCart = { ...cart };
        }

        newCart[itemSlug].qty -= 1;

        if (newCart[itemSlug].qty <= 0) {
            delete newCart[itemSlug];
        }

        // Update cart state && update local storage
        if (type === 'BUY_NOW') {
            setBuyNowCart(newCart);
        } else {
            setCart(newCart);
        }
        getSubTotal(newCart, type);
        saveCart(newCart, type);
    };

    function saveCart(newCart, type) {
        if (type === 'BUY_NOW') {
            localStorage.setItem('buyNow', JSON.stringify(newCart));
        } else {
            localStorage.setItem('cart', JSON.stringify(newCart));
        }
    }

    function getSubTotal(newCart, type) {
        let subTot = 0;
        Object.keys(newCart).forEach((key) => {
            subTot += newCart[key].price * newCart[key].qty;
        });

        if (type === 'BUY_NOW') {
            setSubTotalBuy(subTot);
        } else {
            setSubTotal(subTot);
        }
    }

    const clearCart = (type) => {
        if (type === 'BUY_NOW') {
            setBuyNowCart({});
            localStorage.removeItem('buyNow');
        } else {
            setCart({});
            localStorage.removeItem('cart');
        }
    };

    return (
        <>
            <Head>
                <title>wear e-commerce - wear the codes</title>
                <meta name="description" content="Codeswear.com. A e-commerce website" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <ContextsProvider
                cartValue={{
                    cart,
                    buyNowCart,
                    addToCart,
                    buyNow,
                    removeToCart,
                    saveCart,
                    clearCart,
                    subTotal,
                    subTotalBuy,
                }}
            >
                <main className="overflow-x-hidden pt-[5.8rem] sm:pt-14">
                    <Header />
                    <main>{children}</main>
                    <Footer />
                </main>
            </ContextsProvider>
        </>
    );
}
