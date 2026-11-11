import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ResourceProps from "./DisplayResourceDetailed";
import api from "../api/api";

const DetaliedResources = () => {
    const { id } = useParams();
    const [resource, setResource] = useState(null);
    const [error, setError] = useState("");
    useEffect(() => {
        const getResource = async () => {
            try {
                const response = await api.get(`/resources/${id}`);
                setResource(response.data.resource ?? response.data);
            } catch (err) {
                setError(
                    err.response?.data?.error ||
                    "Failed to load resource."
                );
            }
        };

        getResource();
    }, [id]);

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
                </div>
            </div>
        </div>
    );
};

export default DetaliedResources;