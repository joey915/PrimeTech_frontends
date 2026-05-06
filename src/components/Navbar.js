import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";

function Navbar() {
    const navigate = useNavigate();

    // 🔐 Track auth state properly (reactive)
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/login");
    };

    return (
        <div className="navbar">
            <h2>OnlineStore</h2>

            <div className="links">
                <Link to="/">Products</Link>
                <Link to="/cart">Cart</Link>
               
                <Link to="/register">Register</Link>

                {/* 🔐 AUTH SECTION */}
                {isLoggedIn ? (
                    <>
                        <Link to="/checkout">Checkout</Link>

                        <button
                            onClick={handleLogout}
                            className="logout-btn"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </div>
        </div>
    );
}

export default Navbar;