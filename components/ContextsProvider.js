import { CartProvider } from '../contexts/CartContext';
import { UserProvider } from '../contexts/UserContext';
import { WindowSizeProvider } from '../contexts/WindowSizeCtx';

export default function ContextsProvider({ children, cartValue, userValue }) {
    return (
        <WindowSizeProvider>
            <UserProvider value={userValue}>
                <CartProvider value={cartValue}>{children}</CartProvider>
            </UserProvider>
        </WindowSizeProvider>
    );
}
