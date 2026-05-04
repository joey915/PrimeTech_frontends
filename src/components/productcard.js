import "./productcard.css";

function ProductCard({ product, addToCart }) {
    return (
        <div className="card">
            <h3>{product.productName}</h3>
            <p className="price">${product.price}</p>

            <button onClick={() => addToCart(product)}>
                Add to Cart
            </button>
        </div>
    );
}

export default ProductCard;