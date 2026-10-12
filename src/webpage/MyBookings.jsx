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
        <div className="container py-4">
            <h1 className="text-center">My bookings</h1>
            <div className="row">
                {myBookings.map((booking) => (
                    <BookingCard key={booking._id} booking={booking} />
                ))}
            </div>
        </div>
    );
};

export default MyBookings;