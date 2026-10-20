import styles from "../styles/BookingDetailsProps.module.css";
import { Link } from "react-router-dom";

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
            </div>
        </div>
    );
};

export default BookingDetailsProps;