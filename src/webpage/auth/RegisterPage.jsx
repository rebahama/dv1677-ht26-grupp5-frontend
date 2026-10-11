import { useEffect, useState } from 'react';
import api from '../../api/api';

const RegisterPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")


    const handleRegister = async (event) => {
        event.preventDefault();
        setMessage("");

        try {
            const response = await api.post("/api/auth/register", {
                email,
                password,
            });

            setMessage(
                response.data.message || "Registration successful!"
            );

            setEmail("");
            setPassword("");
        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Registration failed."
            );
        }
    };

    return (
        <div className="container mt-4">
            <h1>Register</h1>

            <form onSubmit={handleRegister}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>

                    <input
                        id="email"
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>

                    <input
                        id="password"
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Create account
                </button>
            </form>

            {message && <p className="mt-3">{message}</p>}
        </div>
    );
};

export default RegisterPage