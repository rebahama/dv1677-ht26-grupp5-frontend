import styles from "../styles/BookingCardProps.module.css";


const BookingCardProps = ({ booking }) => {
    const { resourceId, bookedBy, startsAt, endsAt } = booking;

    return (
        <div className="col-12 col-md-6 col-xl-4 mb-4">
            <div className={`card h-100 ${styles.bookingCard}`}>
                <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <span className={styles.bookingLabel}>
                            BOOKING
                        </span>
                    </div>

                    <h4 className={`card-title mb-4 ${styles.bookingTitle}`}>
                        Booking details
                    </h4>

                    <div className={styles.bookingInfo}>
                        <p className={styles.infoLabel}>Resource</p>
                        <p className={styles.infoValue}>{resourceId}</p>
                    </div>

                    <div className={styles.bookingInfo}>
                        <p className={styles.infoLabel}>Booked by</p>
                        <p className={styles.infoValue}>{bookedBy}</p>
                    </div>

                    <div className={styles.bookingInfo}>
                        <p className={styles.infoLabel}>Starts at</p>
                        <p className={styles.infoValue}>
                            {new Date(startsAt).toLocaleString()}
                        </p>
                    </div>

                    <div className={styles.bookingInfo}>
                        <p className={styles.infoLabel}>Ends at</p>
                        <p className={styles.infoValue}>
                            {new Date(endsAt).toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingCardProps