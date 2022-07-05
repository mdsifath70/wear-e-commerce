import { CartProvider } from '../contexts/CartContext';

export default function ContextsProvider({ children, cartValue }) {
    return <CartProvider value={cartValue}>{children}</CartProvider>;
}
