import { createContext, useContext } from 'react';

export const CartContext = createContext(null);

export const useCartContext = () => {
    const cartContext = useContext(CartContext);
    return cartContext;
};

export const CartProvider = ({ children, value }) => {
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};
