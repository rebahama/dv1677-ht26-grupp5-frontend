import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from '../../api/api';
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from '../../context/AuthContext';
import styles from '../../styles/LoginPage.module.css';

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        setMessage("");
        setLoading(true);

        try {
            const response = await api.post("/api/auth/login", {
                email,
                password,
            });

            const token = response.data.token;

            if (!token) {
                setMessage("Login failed: no token received.");
                return;
            }

            const user = response.data.user ?? { email };

            login(user, token);

            navigate("/showall");
        } catch (error) {
            setMessage(
                error.response?.data?.error ||
                error.response?.data?.message ||
                "Login failed. Please check your credentials."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className={styles.loginContainer}>
            <Card className={styles.loginCard}>
                <Card.Body className="p-4 p-md-5">
                    <h1 className={styles.loginTitle}>
                        Welcome back
                    </h1>
                    <p className={styles.loginSubtitle}>
                        Log in to access the equipment booking system.
                    </p>
                    {message && (
                        <Alert variant="danger">
                            {message}
                        </Alert>
                    )}
                    <Form onSubmit={handleLogin}>
                        <Form.Group className="mb-3" controlId="loginEmail">
                            <Form.Label className={styles.label}>
                                Email address
                            </Form.Label>
                            <Form.Control
                                className={styles.input}
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                autoComplete="email"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="loginPassword">
                            <Form.Label className={styles.label}>
                                Password
                            </Form.Label>

                            <Form.Control
                                className={styles.input}
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                                autoComplete="current-password"
                                required
                            />
                        </Form.Group>
                        <Button
                            type="submit"
                            className={styles.loginButton} 
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Log in"}
                        </Button>
                    </Form>
                    <p className={styles.registerText}>
                        Don't have an account?{" "}
                        <Link to="/register" className={styles.registerLink}>
                            Create an account
                        </Link>
                    </p>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default LoginPage;