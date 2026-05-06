import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function Checkout() {
    const { cart, clearCart } = useContext(CartContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const total = cart.reduce(
        (sum, item) => sum + item.price * (item.quantity || 1),
        0
    );

    const handlePayment = async () => {
        const token = localStorage.getItem("token");

        // 🔐 BLOCK UNAUTHENTICATED USERS
        if (!token) {
            navigate("/login");
            return;
        }

        setLoading(true);

        try {
            // ======================
            // 1️⃣ CREATE ORDER
            // ======================
            const orderResponse = await api.post("/api/orders", {
                totalAmount: total,
                status: "Pending"
            });

            const orderId =
                orderResponse.data.orderID ||
                orderResponse.data.id;

            // ======================
            // 2️⃣ PAYNOW REQUEST
            // ======================
            const paymentResponse = await api.post(
                "/api/paynow/create",
                {
                    orderId: orderId,
                    amount: total
                }
            );

            const redirectUrl =
                paymentResponse.data?.redirectUrl;

            if (redirectUrl) {
                clearCart();
                window.location.href = redirectUrl;
            } else {
                alert("Payment gateway did not return redirect URL");
            }
        } catch (err) {
            console.error("PAYNOW ERROR:", err);

            // ✅ SAFE ERROR HANDLING (IMPORTANT FIX)
            const errors = err.response?.data?.errors;

            const message =
                errors
                    ? Object.values(errors)[0][0]
                    : err.response?.data?.title ||
                      err.response?.data?.message ||
                      "Payment failed";

            alert(message); // 🔥 NEVER render object in JSX
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
                    {cart.map((item) => (
                        <div key={item.productID || item.id}>
                            {item.productName} - $
                            {item.price} x{" "}
                            {item.quantity || 1} = $
                            {(
                                item.price *
                                (item.quantity || 1)
                            ).toFixed(2)}
                        </div>
                    ))}

                    <h3>Total: ${total.toFixed(2)}</h3>

                    <button
                        onClick={handlePayment}
                        disabled={loading}
                    >
                        {loading
                            ? "Processing..."
                            : "Pay with PayNow"}
                    </button>
                </>
            )}
        </div>
    );
}

export default Checkout;