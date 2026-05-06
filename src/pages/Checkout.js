import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import api from "../api/api";

function Checkout() {
    const { cart, clearCart } = useContext(CartContext);
    const [loading, setLoading] = useState(false);

    const total = cart.reduce(
        (sum, item) => sum + (item.price * (item.quantity || 1)),
        0
    );

    const handlePayment = async () => {
        setLoading(true);

        try {
            // ✅ FIX 1: correct backend route
            const orderResponse = await api.post("/api/orders", {
                totalAmount: total,
                status: "Pending"
            });

            const orderId = orderResponse.data.orderID || orderResponse.data.id;

            // ⚠️ FIX 2: correct PayNow route
            const paymentResponse = await api.post("/api/paynow/create", {
                orderId: orderId,
                amount: total
            });

            const redirectUrl = paymentResponse.data.redirectUrl;

            if (redirectUrl) {
                clearCart();
                window.location.href = redirectUrl;
            } else {
                alert("No redirect URL returned by backend.");
            }

        } catch (err) {
            console.error("PAYNOW ERROR:", err);
            alert("Payment failed - check console for details");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Checkout</h2>

            {cart.length === 0 ? (
                <p>No items in cart</p>
            ) : (
                <>
                    {cart.map(item => (
                        <div key={item.productID || item.id}>
                            <p>
                                {item.productName} - ${item.price} x{" "}
                                {item.quantity || 1} ={" "}
                                ${(item.price * (item.quantity || 1)).toFixed(2)}
                            </p>
                        </div>
                    ))}

                    <h3>Total: ${total.toFixed(2)}</h3>

                    <button onClick={handlePayment} disabled={loading}>
                        {loading ? "Processing..." : "Pay with PayNow"}
                    </button>
                </>
            )}
        </div>
    );
}

export default Checkout;