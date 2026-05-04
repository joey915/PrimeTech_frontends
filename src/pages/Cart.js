import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Cart() {
    const { cart, removeFromCart } = useContext(CartContext);
    const navigate = useNavigate();

    const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

    return (
        <div style={{ padding: 20 }}>
            <h2>Cart</h2>

            {cart.length === 0 && <p>Cart is empty</p>}

            {cart.map(item => (
                <div key={item.productID}>
                    <h4>{item.productName}</h4>
                    <p>${item.price} x {item.quantity || 1} = ${(item.price * (item.quantity || 1)).toFixed(2)}</p>

                    <button onClick={() => removeFromCart(item.productID)}>
                        Remove
                    </button>
                </div>
            ))}

            <h3>Total: ${total.toFixed(2)}</h3>

            <button onClick={() => navigate("/checkout")}>
                Checkout
            </button>
        </div>
    );
}

export default Cart;