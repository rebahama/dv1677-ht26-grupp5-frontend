import styles from "../styles/BookingDetailsProps.module.css";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";

const BookingDetailsProps = ({ booking }) => {
    const {
        _id,
        resourceId,
        bookedBy,
        startsAt,
        endsAt,
        status,
        createdAt
    } = booking;

    const { token } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleDeleteBooking = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this booking?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await api.delete(`/bookings/${_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            navigate("/bookings");
        } catch (err) {
            setError(
                err.response?.data?.error ||
                "Failed to delete booking."
            );
        }
    };

    return (
        <div className={`card shadow-sm ${styles.bookingCard}`}>
            <div className="card-body p-4">
                <h2 className="card-title mb-4">Detailed booking</h2>
                <p><strong>Booking ID:</strong> {_id}</p>
                <p><strong>Resource ID:</strong> {String(resourceId)}</p>
                <p><strong>Booked by:</strong> {bookedBy}</p>
                <p>
                    <strong>Starts at:</strong>
                    {new Date(startsAt).toLocaleString()}
                </p>
                <p>
                    <strong>Ends at:</strong>
                    {new Date(endsAt).toLocaleString()}
                </p>
                {status && (
                    <p>
                        <strong>Status:</strong>
                        <span className="badge text-bg-success">
                            {status}
                        </span>
                    </p>
                )}
                {createdAt && (
                    <p className="mb-0">
                        <strong>Created at:</strong>
                        {new Date(createdAt).toLocaleString()}
                    </p>
                )}
                <div className={`${styles.btnPos}`}>
                    <Link to="/bookings" className={styles.backLink}>
                        <span aria-hidden="true"> </span> Back to my bookings
                    </Link>

                    <Link to={`/bookings/detail/${resourceId}`} className={styles.backLink}>
                        <span aria-hidden="true"> </span> View detalied resources info
                    </Link>
                </div>
                 <button
                        className="btn btn-danger mt-3"
                        onClick={handleDeleteBooking}
                    >
                        Delete booking
                    </button>
            </div>
        </div>
    );
};

export default BookingDetailsProps;