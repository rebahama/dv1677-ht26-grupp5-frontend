import styles from "../styles/BookingCardProps.module.css";
import linkStyles from "../styles/BookingDetailsProps.module.css";
import { Link } from "react-router-dom";


const BookingCardProps = ({ booking }) => {
    const { resourceId, bookedBy, _id } = booking;

    return (
        <div className="col-12 col-md-6 col-xl-4 mb-4">
            <div className={`card h-100 ${styles.bookingCard}`}>
                <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <span className={styles.bookingLabel}>
                            BOOKING
                        </span>
                    </div>

                    <div className={styles.bookingInfo}>
                        <p className={styles.infoLabel}>Resource</p>
                        <p className={styles.infoValue}>{resourceId}</p>
                    </div>

                    <div className={styles.bookingInfo}>
                        <p className={styles.infoLabel}>Booked by</p>
                        <p className={styles.infoValue}>{bookedBy}</p>
                    </div>

                    <Link to={`/bookings/${_id}`} className={linkStyles.backLink }>
                        Click here to view details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BookingCardProps