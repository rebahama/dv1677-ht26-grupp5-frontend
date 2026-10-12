import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api";
import BookingDetailProp from "./BookingDetailProps"

const BookingDetails = () => {
    const { id } = useParams()
    const [booking, setBooking] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const getBooking = async () => {
            try {
                const response = await api.get("/bookings");

                const bookings = response.data.bookings ?? response.data;

                const foundBooking = bookings.find(
                    (booking) => booking._id === id
                );

                setBooking(foundBooking ?? null);
            } catch (error) {
                console.error("Error fetching booking:", error);
                setError("Could not load booking details.");
            } finally {
                setLoading(false);
            }
        };

        getBooking();
    }, [id]);

    if (loading) {
        return <p>Loading booking details...</p>;
    }

    if (error) {
        return (
            <div>
                <p>{error}</p>
                <Link to="/bookings">Back to my bookings</Link>
            </div>
        );
    }

    if (!booking) {
        return (
            <div>
                <h2>Booking not found</h2>
                <Link to="/bookings">Back to my bookings</Link>
            </div>
        );
    }

    return (
        <div>
            <BookingDetailProp booking={booking} />
        </div>
    );


}

export default BookingDetails