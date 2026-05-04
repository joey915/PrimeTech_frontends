import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";

function App() {
    return (
        <Router>
            <div style={{ padding: 10, background: "#222", color: "white" }}>
                <Link to="/">Products</Link> |{" "}
                <Link to="/cart">Cart</Link>
            </div>

            <Routes>
                <Route path="/" element={<Products />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/success" element={<Success />} />
            </Routes>
        </Router>
    );
}

export default App;