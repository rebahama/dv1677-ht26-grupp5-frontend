import styles from "../styles/BookingDetailsProps.module.css";
import stylesLogin from "../styles/LoginPage.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const DisplayResourceDetalied = ({ resource }) => {
    const { name, provider, capacity } = resource;
    const { vcpus, ramMb, diskGb } = capacity || {};
    const { user } = useAuth();
    const roundNumberRam = Math.round(ramMb)
    const roundNumberdiskGb = Math.round(diskGb)

    return (
        <div className={`card ${styles.resourceCard}`}>
            <div className={`card-header ${styles.resourceCardHeader}`}>
                <h5 className="mb-0">{name}</h5>
            </div>
            <div className="card-body d-flex flex-column p-4">
                <div className={styles.resourceProvider}>
                    <span className={styles.resourceProviderLabel}>
                        Provider
                    </span>
                    <span className="badge bg-info text-dark">
                        {provider}
                    </span>
                </div>
                <hr />
                <h6 className={styles.resourceCapacityTitle}>
                    Resource capacity
                </h6>
                <div className={styles.resourceCapacityList}>
                    <div className={styles.resourceCapacityRow}>
                        <span>vCPUs</span>
                        <strong>{vcpus ?? "N/A"}</strong>
                    </div>

                    <div className={styles.resourceCapacityRow}>
                        <span>RAM</span>
                        <strong>
                            {ramMb != null
                                ? `${roundNumberRam} MB`
                                : "N/A"}
                        </strong>
                    </div>

                    {diskGb != null && (
                        <div className={styles.resourceCapacityRow}>
                            <span>Disk</span>
                            <strong>{roundNumberdiskGb} GB</strong>
                        </div>
                    )}
                </div>

                <div className={styles.resourceCardFooter}>
                    {user ? (
                        <Link to="/bookings" className={styles.backLink}>
                            Back to bookings
                        </Link>
                    ) : (
                        <p className={`${stylesLogin.registerText} mb-0 text-center`}>
                            Please{" "}
                            <Link
                                to="/login"
                                className={stylesLogin.registerLink}
                            >
                                log in
                            </Link>{" "}
                            to create a booking.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DisplayResourceDetalied;