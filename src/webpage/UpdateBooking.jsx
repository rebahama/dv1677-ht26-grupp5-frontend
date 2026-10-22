import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";

const UpdateBooking = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [endDate, setEndDate] = useState("");
    const [endTime, setEndTime] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const today = new Date();
    const minDate = `${today.getFullYear()}-${String(
        today.getMonth() + 1
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    const handleUpdate = async (event) => {
        event.preventDefault();
        setMessage("");
        if (!endDate || !endTime) {
            setMessage("Please select an end date and time.");
            return;
        }

        try {
            setLoading(true);
            const endsAt = new Date(
                `${endDate}T${endTime}:00`
            ).toISOString();
            const response = await api.put(
                `/bookings/${id}/end-time`,
                { endsAt }
            );

            setMessage(
                response.data.message || "Booking end time updated."
            );

            navigate("/bookings");
        } catch (error) {
            console.error("Update booking error:", error);
            console.error("Backend response:", error.response?.data);

            setMessage(
                error.response?.data?.error ||
                error.response?.data?.message ||
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
                                <div className="mb-3">
                                    <label
                                        htmlFor="endDate"
                                        className="form-label fw-semibold"
                                    >
                                        New end date
                                    </label>
                                    <input
                                        id="endDate"
                                        type="date"
                                        className="form-control"
                                        value={endDate}
                                        min={minDate}
                                        onChange={(event) =>
                                            setEndDate(event.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="endTime"
                                        className="form-label fw-semibold"
                                    >
                                        New end time
                                    </label>
                                    <select
                                        id="endTime"
                                        className="form-select form-select-lg"
                                        value={endTime}
                                        onChange={(event) =>
                                            setEndTime(event.target.value)
                                        }
                                        required
                                    >
                                        <option value="">
                                            Select end time
                                        </option>
                                        {Array.from(
                                            { length: 10 },
                                            (_, index) => {
                                                const hour = index + 9;
                                                const time =
                                                    `${String(hour).padStart(2, "0")}:00`;
                                                return (
                                                    <option
                                                        key={time}
                                                        value={time}
                                                    >
                                                        {time}
                                                    </option>
                                                );
                                            }
                                        )}
                                    </select>
                                </div>
                                {message && (
                                    <div
                                        className="alert alert-danger"
                                        role="alert"
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