import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/api";

const SyncDatabase = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSync = async (event) => {
        event.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            await api.get("/resources/broker");

            setMessage("Database synced successfully!");
            setSuccess(true);
        } catch (error) {
            console.error("Database sync error:", error);

            setMessage(
                error.response?.data?.error ||
                error.response?.data?.message ||
                "Could not sync database."
            );

            setSuccess(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="card shadow-sm">
                        <div className="card-body p-4">
                            <h1 className="h3 text-center mb-3">
                                Sync database
                            </h1>
                            <p className="text-muted text-center mb-4">
                                Synchronize resources from the broker
                                to the local database.
                            </p>
                            <form onSubmit={handleSync}>
                                {message && (
                                    <div
                                        className={`alert ${success
                                            ? "alert-success"
                                            : "alert-danger"
                                            }`}
                                        role="status"
                                    >
                                        {message}
                                    </div>
                                )}
                                <div className="d-grid">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={loading}
                                    >
                                        {loading
                                            ? "Syncing..."
                                            : "Sync database"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SyncDatabase;