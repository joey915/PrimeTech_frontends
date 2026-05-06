import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";

import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
    return (
        <Router>

            {/* ✅ GLOBAL NAVBAR */}
            <Navbar />

            {/* ROUTES */}
            <Routes>
                <Route path="/" element={<Products />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/success" element={<Success />} />

                {/* AUTH */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>

        </Router>
    );
}

export default App;