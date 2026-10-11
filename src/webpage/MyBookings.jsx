import { useState, useEffect } from "react";
import api from "../api/api";
import BookingCard from "./BookingCardProps";

const MyBookings = () => {
    const [myBookings, setMyBookings] = useState([]);

    const getBookings = async () => {
        try {
            const response = await api.get("/bookings");
            setMyBookings(response.data);
        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    };

    useEffect(() => {
        getBookings();
    }, []);

    return (
        <div>
            <h1>My bookings</h1>
            {myBookings.map((booking) => (
                <BookingCard
                    key={booking._id}
                    booking={booking}
                />
            ))}
        </div>
    );
};

export default MyBookings;