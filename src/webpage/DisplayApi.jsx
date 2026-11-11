import { useEffect, useState } from "react";
import ResourceProps from "./ResourceProps";
import api from "../api/api";

const DisplayApi = () => {
    const [resources, setResources] = useState([]);
    const [error, setError] = useState("");

    const getResources = async () => {
        try {
            const response = await api.get("/resources/broker/list");
            setResources(response.data);
        } catch (err) {
            setError(
                err.response?.data?.error ||
                "Failed to load resources. Please try again later."
            );
            console.error("Error fetching resources:", err);
        }
    };

    useEffect(() => {
        getResources();
    }, []);

    return (
        <div className="container py-4">
            <h1 className="mb-4 text-center">Available resources</h1>
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            {!error && resources.length === 0 && (
                <p className="text-center text-muted">
                    No resources available.
                </p>
            )}
            <div className="row g-3">
                {resources.map((resource) => (
                    <div
                        className="col-12 col-sm-6 col-lg-4 col-xxl-3"
                        key={resource._id}
                    >
                        <ResourceProps resource={resource} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DisplayApi;