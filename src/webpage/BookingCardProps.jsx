import styles from "../styles/BookingCardProps.module.css";
import linkStyles from "../styles/BookingDetailsProps.module.css";
import { Link } from "react-router-dom";


const BookingCardProps = ({ booking }) => {
    const { endsAt, startsAt, _id, status } = booking;
    const startDate = new Date(startsAt);
    const endDate = new Date(endsAt);

    const formattedStartDate = startDate.toLocaleString("sv-SE", {
        dateStyle: "short",
        timeStyle: "short",
    });

    const formattedEndDate = endDate.toLocaleString("sv-SE", {
        dateStyle: "short",
        timeStyle: "short",
    });

    return (
        <div className="col-12 col-md-6 col-xl-4 mb-4">
            <div className={`card h-100 ${styles.bookingCard}`}>
                <div className="card-body p-5 text-center">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <span className={styles.bookingLabel}>
                            Bookings
                        </span>
                    </div>
                    <div className={styles.bookingInfo}>
                        <p className={styles.infoLabel}>Start time:</p>
                        <p className={styles.infoValue}>{formattedStartDate}</p>
                    </div>
                    <div className={styles.bookingInfo}>
                        <p className={styles.infoLabel}>End time:</p>
                        <p className={styles.infoValue}>{formattedEndDate}</p>
                    </div>
                    <div className={styles.bookingInfo}>
                        <p className={styles.infoLabel}>Status</p>
                        <p className={styles.infoValue}>{status}</p>
                    </div>
                    <Link to={`/bookings/${_id}`} className={linkStyles.backLink}>
                        Click here to view details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BookingCardProps