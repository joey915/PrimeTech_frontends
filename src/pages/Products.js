import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import api from "../api/api";
import ProductCard from "../components/productcard";

function Products() {
    const { addToCart } = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // ✅ FIX: correct backend route
                const response = await api.get("/api/products");

                // 🛡️ safety check (prevents "map is not a function")
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

    return (
        <div style={{ padding: 20 }}>
            <h2>Products</h2>

            {loading && <p>Loading products...</p>}
            {error && <p>{error}</p>}

            <div className="grid">
                {Array.isArray(products) &&
                    products.map(product => (
                        <ProductCard
                            key={product.productID || product.id}
                            product={product}
                            addToCart={addToCart}
                        />
                    ))
                }
            </div>

            {!loading && !products.length && !error && (
                <p>No products found.</p>
            )}
        </div>
    );
}

export default Products;