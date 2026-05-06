import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api"; // IMPORTANT: use central axios instance

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // 🔐 Login request
            const res = await api.post("/api/auth/login", {
                email: email,
                passwordHash: password
            });

            // 💾 Save JWT token
            localStorage.setItem("token", res.data.token);

            // 🚀 Redirect after login
            navigate("/");
        } catch (err) {
            console.error(err);

    const errors = err.response?.data?.errors;

    const message =
        errors
            ? Object.values(errors)[0][0]
            : err.response?.data?.title ||
              err.response?.data?.message ||
              "Invalid email or password";

    setError(message);
        }
    };

    return (
        <div
            style={{
                padding: 20,
                maxWidth: 400,
                margin: "auto"
            }}
        >
            <h2>Login</h2>

            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                        width: "100%",
                        padding: 10,
                        marginBottom: 10
                    }}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{
                        width: "100%",
                        padding: 10,
                        marginBottom: 10
                    }}
                />

                {error && (
                    <p style={{ color: "red" }}>{error}</p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: 10
                    }}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
}

export default Login;