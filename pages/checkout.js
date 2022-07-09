import { useEffect, useRef, useState } from 'react';
import { BsFillBagCheckFill } from 'react-icons/bs';
import Button from '../components/Button';
import CartCounterBtn from '../components/CartCounterBtn';
import Input from '../components/Input';
import SectionCon from '../components/SectionCon';
import { useCartContext } from '../contexts/CartContext';

export default function Checkout() {
    const [formHeight, setFormHeight] = useState('auto');
    const { cart, buyNowCart, subTotal, subTotalBuy } = useCartContext();
    const formRef = useRef(null);

    function solvedCartConHeight() {
        if (window.innerWidth > 768) {
            setFormHeight(formRef.current.scrollHeight + 'px');
        } else {
            setFormHeight('auto');
        }
    }

    useEffect(() => {
        solvedCartConHeight();
        window.addEventListener('resize', solvedCartConHeight);
        return () => window.removeEventListener('resize', solvedCartConHeight);
    }, []);

    return (
        <SectionCon>
            <h1 className="text-2xl font-medium text-center mb-6">Checkout</h1>
            <div className="flex gap-5 lg:gap-8 flex-col md:flex-row">
                <div className="flex-grow">
                    <form ref={formRef} className="space-y-4">
                        <div className="flex flex-col md:flex-row gap-5">
                            <label className="flex-grow space-y-2">
                                <span className="after:content-['*'] after:ml-1 after:text-red-500">Name</span>
                                <Input type="text" name="name" placeholder="Enter your name" />
                            </label>
                            <label className="flex-grow space-y-2">
                                <span className="after:content-['*'] after:ml-1 after:text-red-500">Email</span>
                                <Input type="email" name="email" placeholder="Enter your email" />
                            </label>
                        </div>
                        <div>
                            <label className="flex-grow space-y-2">
                                <span className="after:content-['*'] after:ml-1 after:text-red-500">Address</span>
                                <Input as="textarea" rows="2" name="address" placeholder="Enter your address" />
                            </label>
                        </div>
                        <div className="flex flex-col md:flex-row gap-5">
                            <label className="flex-grow space-y-2">
                                <span className="after:content-['*'] after:ml-1 after:text-red-500">Phone</span>
                                <Input type="number" name="phone" placeholder="Enter your phone number" />
                            </label>
                            <label className="flex-grow space-y-2">
                                <span className="after:content-['*'] after:ml-1 after:text-red-500">City</span>
                                <Input type="text" name="city" placeholder="Enter your city" />
                            </label>
                        </div>
                        <div className="flex flex-col md:flex-row gap-5">
                            <label className="flex-grow space-y-2">
                                <span className="after:content-['*'] after:ml-1 after:text-red-500">State</span>
                                <Input type="text" name="state" placeholder="Enter your state" />
                            </label>
                            <label className="flex-grow space-y-2">
                                <span className="after:content-['*'] after:ml-1 after:text-red-500">Pin Code</span>
                                <Input type="text" name="pinCode" placeholder="Enter your pin code" />
                            </label>
                        </div>
                    </form>
                </div>
                <div className="relative md:w-5/12 lg:w-1/3 2xl:w-1/4 border border-indigo-200 rounded">
                    <div className="bg-indigo-100 p-4 md:pb-32 overflow-y-auto" style={{ height: formHeight }}>
                        <h1 className="flex items-center justify-between text-xl border-b border-b-indigo-500 pb-3 mb-4">
                            {Object.keys(buyNowCart).length === 0 ? 'Your Products cart ' : 'Buy now Product '}(
                            {Object.keys(buyNowCart).length || Object.keys(cart).length})
                        </h1>

                        {Object.keys(cart).length === 0 && Object.keys(buyNowCart).length === 0 ? (
                            <h3 className="font-medium">Sorry! There is no product</h3>
                        ) : (
                            <>
                                <ol className="list-decimal pl-4 space-y-3">
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
                                <div className="md:absolute mt-10 md:mt-0 bottom-0 pt-3 pb-4 inset-x-0 space-y-4 bg-inherit">
                                    <h2 className="text-lg text-center">
                                        Subtotal: ${Object.keys(buyNowCart).length !== 0 ? subTotalBuy : subTotal}
                                    </h2>
                                    <div className="flex gap-3 justify-center">
                                        <Button>
                                            <BsFillBagCheckFill /> Pay $
                                            {Object.keys(buyNowCart).length !== 0 ? subTotalBuy : subTotal}
                                        </Button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </SectionCon>
    );
}
