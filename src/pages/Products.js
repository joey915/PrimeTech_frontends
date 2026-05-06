import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import api from "../api/api";
import ProductCard from "../components/productcard";

function Products() {
    const { addToCart } = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ✅ NEW: success message state
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get("/api/products");

                const data = Array.isArray(response.data)
                    ? response.data
                    : response.data?.$values || [];

                setProducts(data);
            } catch (err) {
                console.error("Failed to load products", err);
                setError("Unable to load products");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // ✅ FIXED ADD TO CART WITH MESSAGE
    const handleAddToCart = (product) => {
        addToCart(product);

        setMessage(
            "Successfully added to cart. Click Cart to view it."
        );

        setTimeout(() => {
            setMessage("");
        }, 3000);
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Products</h2>

            {/* ✅ SUCCESS MESSAGE */}
            {message && (
                <div
                    style={{
                        background: "#4CAF50",
                        color: "white",
                        padding: "10px",
                        marginBottom: "10px",
                        borderRadius: "5px"
                    }}
                >
                    {message}
                </div>
            )}

            {loading && <p>Loading products...</p>}
            {error && <p>{error}</p>}

            <div className="grid">
                {Array.isArray(products) &&
                    products.map((product) => (
                        <ProductCard
                            key={product.productID || product.id}
                            product={product}
                            addToCart={handleAddToCart} // ✅ IMPORTANT FIX
                        />
                    ))}
            </div>

            {!loading && !products.length && !error && (
                <p>No products found.</p>
            )}
        </div>
    );
}

export default Products;