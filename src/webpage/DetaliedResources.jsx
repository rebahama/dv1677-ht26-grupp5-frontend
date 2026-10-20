import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ResourceProps from "./ResourceProps";
import styles from "../styles/BookingDetailsProps.module.css";
import api from "../api/api";

const DetaliedResources = () => {
    const { id } = useParams();
    const [resource, setResource] = useState(null);
    const [error, setError] = useState("");
    const { token } = useAuth();
    useEffect(() => {
        const getResource = async () => {
            try {
                const response = await api.get(`/resources/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setResource(response.data.resource ?? response.data);
            } catch (err) {
                setError(
                    err.response?.data?.error ||
                    "Failed to load resource."
                );
            }
        };

        getResource();
    }, [id, token]);

    if (error) {
        return <div className="container py-4 alert alert-danger">{error}</div>;
    }

    if (!resource) {
        return <div className="container py-4">Loading resource...</div>;
    }

    return (
        <div className="container py-4">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <ResourceProps resource={resource} />
                    <Link to="/bookings" className={styles.backLink}>
                        Back to bookings
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DetaliedResources;