import { deleteCookie } from 'cookies-next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { BsFillCartCheckFill } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { FiShoppingCart } from 'react-icons/fi';
import { HiOutlineLogout } from 'react-icons/hi';
import { MdCleaningServices } from 'react-icons/md';
import { TbLogin } from 'react-icons/tb';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCartContext } from '../contexts/CartContext';
import { useUserContext } from '../contexts/UserContext';
import { useWindowSizeCtx } from '../contexts/WindowSizeCtx';
import Button from './Button';
import CartCounterBtn from './CartCounterBtn';
import Logo from './Logo';

const navMenus = ['tshirts', 'hoodies', 'stickers', 'mugs'];

export default function Header() {
    const { cart, clearCart, buyNowCart, subTotal, subTotalBuy } = useCartContext();
    const { user, setUser } = useUserContext();
    const { windowWidth } = useWindowSizeCtx();
    const cartRef = useRef(null);
    const router = useRouter();

    const toggleCart = () => {
        const classes = cartRef.current.classList;

        if (classes.contains('translate-x-0')) classes.remove('translate-x-0');

        if (classes.contains('translate-x-full')) {
            classes.remove('translate-x-full');
        } else {
            classes.add('translate-x-full');
        }
    };

    // Logout
    const logoutHandler = () => {
        deleteCookie('bearer_token');
        setUser({
            value: null,
        });
        toast.success('You have successfully logged out');
        router.push('/');
    };

    return (
        <header className="fixed inset-x-0 top-0 z-20 py-3 shadow-md bg-white">
            <div className="container container__space mx-auto">
                <nav className="flex items-center justify-between flex-col md:flex-row gap-x-6 gap-y-3">
                    <div className="mr-auto sm:mr-0">
                        <Logo />
                    </div>
                    <ul className="flex gap-x-4 sm:gap-x-5 flex-wrap justify-center font-medium">
                        {navMenus.map((menu, i) => {
                            return (
                                <li key={i}>
                                    <Link href={`/${menu}`}>
                                        <a className="capitalize hover:text-indigo-600 transition">{menu}</a>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="flex gap-x-2 md:gap-x-4 items-center absolute right-5 sm:right-7 md:static">
                        {user.value ? (
                            <div className="relative group">
                                <div className="flex items-center gap-x-2 bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded cursor-default">
                                    {windowWidth >= 1024 && <h3 className="whitespace-nowrap">Md. Abdul kalam</h3>}
                                    <CgProfile />
                                </div>
                                <ul className="absolute right-0 lg:left-0 m-w-max bg-white shadow-xl rounded py-2 border whitespace-nowrap transition scale-y-0 group-hover:scale-y-100 origin-top">
                                    <li>
                                        <Link href="/profile">
                                            <a className="block px-4 py-1 hover:bg-indigo-100">My profile</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/orders">
                                            <a className="block px-4 py-1 hover:bg-indigo-100">My orders</a>
                                        </Link>
                                    </li>
                                    <li
                                        className="flex items-center gap-x-2 cursor-pointer px-4 py-1 hover:bg-indigo-100"
                                        onClick={logoutHandler}
                                    >
                                        logout <HiOutlineLogout />
                                    </li>
                                </ul>
                            </div>
                        ) : windowWidth > 800 ? (
                            <Link href="/login">
                                <a className="rounded focus:ring-2 ring-indigo-500 ring-offset-2 transition">
                                    <Button as="a" className="leading-none">
                                        login <TbLogin />
                                    </Button>
                                </a>
                            </Link>
                        ) : (
                            <Link href="/login">
                                <a className="relative cursor-pointer">
                                    <TbLogin className="text-lg sm:text-xl" />
                                </a>
                            </Link>
                        )}
                        <span className="relative cursor-pointer" onClick={toggleCart}>
                            <span className="p-1 absolute -right-3 -top-3 rounded-full bg-indigo-500 text-white text-xs md:text-sm font-mono leading-[1]">
                                {Object.keys(buyNowCart).length || Object.keys(cart).length}
                            </span>
                            <FiShoppingCart className="text-lg sm:text-xl" />
                        </span>
                    </div>
                </nav>
            </div>

            {/* Cart */}
            <ToastContainer autoClose={1000} />
            <div
                ref={cartRef}
                className={`absolute top-0 h-screen right-0 z-10 transform ${
                    Object.keys(cart).length !== 0 ? 'translate-x-0' : 'translate-x-full'
                } transition`}
            >
                <div className="w-screen sm:w-[20rem] h-full bg-indigo-100 p-5 border border-indigo-200 sm:rounded-l pb-32 overflow-y-auto">
                    <h1 className="flex items-center justify-between text-xl border-b border-b-indigo-500 absolute bg-inherit inset-x-5 top-0 py-3 md:mr-5">
                        {Object.keys(buyNowCart).length === 0 ? 'Your Products cart ' : 'Buy now Product '}(
                        {Object.keys(buyNowCart).length || Object.keys(cart).length})
                        <span className="text-indigo-500 cursor-pointer" onClick={toggleCart}>
                            <AiFillCloseCircle />
                        </span>
                    </h1>

                    {Object.keys(cart).length === 0 && Object.keys(buyNowCart).length === 0 ? (
                        <h3 className="font-medium mt-12">Sorry! There is no product</h3>
                    ) : (
                        <>
                            <ol className="list-decimal mt-12 pl-4 space-y-4">
                                {Object.keys(buyNowCart).length === 0
                                    ? Object.keys(cart).map((key) => {
                                          return (
                                              <li key={key}>
                                                  <div className="flex gap-2 justify-between">
                                                      <h3>
                                                          {cart[key].title} ({cart[key].size} &#47;{' '}
                                                          {cart[key].colorName || cart[key].variant})
                                                      </h3>
                                                      <CartCounterBtn itemKey={key} qty={cart[key].qty} />
                                                  </div>
                                              </li>
                                          );
                                      })
                                    : Object.keys(buyNowCart).map((key) => {
                                          return (
                                              <li key={key}>
                                                  <div className="flex gap-2 justify-between">
                                                      <h3>
                                                          {buyNowCart[key].title} ({buyNowCart[key].size} &#47;{' '}
                                                          {buyNowCart[key].colorName || buyNowCart[key].variant})
                                                      </h3>
                                                      <CartCounterBtn
                                                          itemKey={key}
                                                          qty={buyNowCart[key].qty}
                                                          type="BUY_NOW"
                                                      />
                                                  </div>
                                              </li>
                                          );
                                      })}
                            </ol>
                            <div className="absolute md:mt-0 bottom-0 inset-x-0 space-y-4 pt-3 pb-4 bg-inherit rounded-t shadow-2xl shadow-indigo-800">
                                <h2 className="text-lg text-center">
                                    Subtotal: ${Object.keys(buyNowCart).length !== 0 ? subTotalBuy : subTotal}
                                </h2>
                                <div className="flex gap-3 justify-center">
                                    <Link href="/checkout">
                                        <a
                                            onClick={toggleCart}
                                            className="rounded focus:ring-2 ring-indigo-500 ring-offset-2 transition"
                                        >
                                            <Button as="a">
                                                <BsFillCartCheckFill />
                                                Checkout
                                            </Button>
                                        </a>
                                    </Link>
                                    <Button
                                        onClick={() => clearCart(Object.keys(buyNowCart).length !== 0 && 'BUY_NOW')}
                                    >
                                        <MdCleaningServices />
                                        Clear Cart
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
