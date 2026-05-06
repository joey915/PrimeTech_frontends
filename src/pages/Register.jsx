import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await api.post("/api/auth/register", {
                name: name,
                email: email,
                passwordHash: password
            });

            alert("Registration successful");

            // go to login page
            navigate("/login");

        } catch (err) {
            console.error(err);
            setError("Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: 20, maxWidth: 400, margin: "auto" }}>
            <h2>Register</h2>

            <form onSubmit={handleRegister}>

                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={{ width: "100%", padding: 10, marginBottom: 10 }}
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ width: "100%", padding: 10, marginBottom: 10 }}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ width: "100%", padding: 10, marginBottom: 10 }}
                />

                {error && <p style={{ color: "red" }}>{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    style={{ width: "100%", padding: 10 }}
                >
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>
        </div>
    );
}

export default Register;