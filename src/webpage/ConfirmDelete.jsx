import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";

const ConfirmDelete = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleDeleteBooking = async () => {
        try {
            await api.delete(`/bookings/${id}`);
            navigate("/bookings");
        } catch (err) {
            setError(
                err.response?.data?.error ||
                "Failed to delete booking."
            );
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-5">
                    <div className="card shadow-sm">
                        <div className="card-body text-center p-4">
                            <h2 className="mb-3">Delete booking</h2>
                            <p className="text-muted">
                                Are you sure you want to delete this booking?
                            </p>
                            <div className="d-flex justify-content-center gap-2 mt-4">
                                <button
                                    className="btn btn-danger"
                                    onClick={handleDeleteBooking}
                                >
                                    Delete booking
                                </button>
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => navigate(-1)}
                                >
                                    Cancel
                                </button>
                            </div>
                            {error && (
                                <div
                                    className="alert alert-danger mt-3 mb-0"
                                    role="alert"
                                >
                                    {error}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDelete;