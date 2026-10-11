import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import api from '../../api/api';
import styles from '../../styles/RegisterPage.module.css';

const RegisterPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();


    const handleRegister = async (event) => {
        event.preventDefault();
        setMessage("");
        setLoading(true);

        try {
            const response = await api.post("/api/auth/register", {
                email,
                password,
            });

            setMessage(
                response.data.message || "Registration successful!"
            );
            setSuccess(true);
            setEmail("");
            setPassword("");
            navigate("/showall");
            
        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                error.response?.data?.error ||
                "Registration failed."
            );
            setSuccess(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`container d-flex align-items-center justify-content-center py-5 ${styles.registerPage}`}>
            <div className={`card border-0 shadow-lg w-100 ${styles.registerCard}`}>
                <div className="card-body p-4 p-md-5">
                    <h1 className={`fw-bold mb-2 ${styles.title}`}>
                        Create an account
                    </h1>
                    <p className={`mb-4 ${styles.subtitle}`}>
                        Sign up to get started with the equipment booking system.
                    </p>
                    <form onSubmit={handleRegister}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label fw-semibold">
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                className={`form-control form-control-lg ${styles.input}`}
                                placeholder="you@example.com"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                autoComplete="email"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="form-label fw-semibold">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                className={`form-control form-control-lg ${styles.input}`}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                autoComplete="new-password"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className={`btn btn-primary btn-lg w-100 fw-semibold ${styles.registerButton}`}
                            disabled={loading}
                        >
                            {loading ? "Creating account..." : "Create account"}
                        </button>
                    </form>
                    {message && (
                        <div
                            className={`alert ${success ? "alert-success" : "alert-danger"
                                } mt-4 mb-0 ${styles.message}`}
                            role="status"
                        >
                            {message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RegisterPage