import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import { useCartContext } from '../contexts/CartContext';

export default function CartCounterBtn({ itemKey, qty, type }) {
    const { addToCart, removeToCart } = useCartContext();

    return (
        <div className="flex items-center gap-x-2">
            <button type="button" onClick={() => removeToCart(itemKey, type)}>
                <AiFillMinusCircle className="text-lg cursor-pointer text-indigo-500" />
            </button>
            <span>{qty}</span>
            <button
                type="button"
                onClick={() =>
                    addToCart(itemKey, null, null, null, null, null, null, type)
                }
            >
                <AiFillPlusCircle className="text-lg cursor-pointer text-indigo-500" />
            </button>
        </div>
    );
}
