import { createContext, useState } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart(prev => {
            const existingItem = prev.find(item => item.productID === product.productID);
            if (existingItem) {
                // If item already exists, increase quantity
                return prev.map(item =>
                    item.productID === product.productID
                        ? { ...item, quantity: (item.quantity || 1) + 1 }
                        : item
                );
            } else {
                // Add new item with quantity 1
                return [...prev, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (productID) => {
        setCart(prev => prev.filter(item => item.productID !== productID));
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    );
};

export { CartContext };
export default CartProvider;