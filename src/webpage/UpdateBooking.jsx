import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";

const UpdateBooking = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [endsAt, setEndsAt] = useState("");
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleUpdate = async (event) => {
        event.preventDefault();
        setLoading(true);
        setMessage("");
        setSuccess(false);

        try {

            const response = await api.put(
                `/bookings/${id}/end-time`,
                {
                    endsAt: new Date(endsAt).toISOString(),
                }
            );

            setSuccess(true);
            setMessage(
                response.data.message || "Booking end time updated."
            );

            navigate("/bookings");
        } catch (error) {
            console.error("Update booking error:", error);
            console.error("Backend response:", error.response?.data);

            setMessage(
                error.response?.data?.error ||
                "Could not update booking end time."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="card shadow-sm border-0">
                        <div className="card-body p-4 p-md-5">
                            <h1 className="h3 text-center mb-2">
                                Update booking
                            </h1>
                            <p className="text-muted text-center mb-4">
                                Choose a new end date and time for your booking.
                            </p>
                            <form onSubmit={handleUpdate}>
                                <div className="mb-4">
                                    <label
                                        htmlFor="endsAt"
                                        className="form-label fw-semibold"
                                    >
                                        New end date and time
                                    </label>
                                    <input
                                        id="endsAt"
                                        type="datetime-local"
                                        className="form-control form-control-lg"
                                        value={endsAt}
                                        onChange={(event) => setEndsAt(event.target.value)}
                                        required
                                    />
                                </div>
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
                                        className="btn btn-primary btn-lg"
                                        disabled={loading}
                                    >
                                        {loading
                                            ? "Updating..."
                                            : "Update booking"}
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

export default UpdateBooking;