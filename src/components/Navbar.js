import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return (
        <div className="navbar">
            <h2>OnlineStore</h2>

            <div className="links">
                <Link to="/">Products</Link>
                <Link to="/cart">Cart</Link>
            </div>
        </div>
    );
}

export default Navbar;