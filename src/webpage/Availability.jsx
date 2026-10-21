import { useEffect, useState } from "react";
import api from "../api/api";

const Availability = ({ resourceId, onSelectSlot }) => {
    const [date, setDate] = useState("");
    const [availableTimes, setAvailableTimes] = useState([]);
    const [bookedTimes, setBookedTimes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedSlot, setSelectedSlot] = useState("");
    const today = new Date();
    const minDate = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, "0"),
        String(today.getDate()).padStart(2, "0"),
    ].join("-");

    useEffect(() => {
        if (!resourceId || !date) return;

        const getAvailability = async () => {
            try {
                setLoading(true);
                setError("");
                setAvailableTimes([]);
                setBookedTimes([]);
                setSelectedSlot("");
                onSelectSlot("", "");

                const dayStart = new Date(`${date}T00:00:00`);
                const dayEnd = new Date(dayStart);
                dayEnd.setDate(dayEnd.getDate() + 1);

                const response = await api.get("/bookings/availability", {
                    params: {
                        resourceId,
                        dayStart: dayStart.toISOString(),
                        dayEnd: dayEnd.toISOString(),
                    },
                });

                setAvailableTimes(response.data.availableTimes || []);
                setBookedTimes(response.data.bookedTimes || []);
            } catch (error) {
                console.error("Could not load availability:", error);
                setError("Could not load availability. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        getAvailability();
    }, [resourceId, date]);

    const slots = Array.from({ length: 10 }, (_, index) => {
        const hour = index + 8;
        const start = new Date(`${date}T00:00:00`);
        start.setHours(hour, 0, 0, 0);
        const end = new Date(start);
        end.setHours(hour + 1);
        const startsAt = start.getTime();
        const endsAt = end.getTime();
        const isBooked = bookedTimes.some(
            (booking) =>
                new Date(booking.startsAt).getTime() < endsAt &&
                new Date(booking.endsAt).getTime() > startsAt
        );
        const isAvailable = availableTimes.some(
            (time) =>
                new Date(time.startsAt).getTime() <= startsAt &&
                new Date(time.endsAt).getTime() >= endsAt
        );
        return {
            label: `${String(hour).padStart(2, "0")}:00–${String(hour + 1).padStart(2, "0")}:00`,
            startsAt,
            endsAt,
            isBooked,
            isAvailable: isAvailable && !isBooked,
        };
    });

    const selectSlot = (slot) => {
        if (!slot.isAvailable) return;
        const toDateTime = (timestamp) => {
            const value = new Date(timestamp);
            const datePart = [
                value.getFullYear(),
                String(value.getMonth() + 1).padStart(2, "0"),
                String(value.getDate()).padStart(2, "0"),
            ].join("-");
            const timePart = [
                String(value.getHours()).padStart(2, "0"),
                String(value.getMinutes()).padStart(2, "0"),
            ].join(":");

            return `${datePart}T${timePart}:00`;
        };
        setSelectedSlot(slot.label);
        onSelectSlot(toDateTime(slot.startsAt), toDateTime(slot.endsAt));
    };

    return (
        <div className="mb-4">
            <h5>Equipment Availability</h5>
            <label htmlFor="availability-date" className="form-label">
                Select booking date
            </label>
            <input
                id="availability-date"
                type="date"
                className="form-control mb-3"
                value={date}
                min={minDate}
                onChange={(event) => {
                    setDate(event.target.value);
                    setSelectedSlot("");
                    onSelectSlot("", "");
                }}
                required
            />
            {loading && <p>Loading availability...</p>}
            {error && <p className="text-danger">{error}</p>}
            {!date && <p>Select a date to see available times</p>}
            {!loading && date && !error && (
                <>
                    <div className="d-flex flex-wrap gap-2">
                        {slots.map((slot) => {
                            const selected = selectedSlot === slot.label;
                            const color = slot.isBooked
                                ? "danger"
                                : !slot.isAvailable
                                    ? "danger"
                                    : "success";
                            return (
                                <button
                                    key={slot.label}
                                    type="button"
                                    className={`btn btn-outline-${color}${selected ? " active" : ""}`}
                                    disabled={!slot.isAvailable}
                                    onClick={() => selectSlot(slot)}
                                >
                                    {slot.label}
                                    {slot.isBooked
                                        ? " (Booked)"
                                        : !slot.isAvailable
                                            ? " (Unavailable)"
                                            : selected
                                                ? " (Selected)"
                                                : ""}
                                </button>
                            );
                        })}
                    </div>
                    <div className="small mt-3">
                        <p className="text-success mb-1">Green: Available to book.</p>
                        <p className="text-danger mb-0">
                            Red: Not available for the full hour.
                        </p>
                    </div>
                </>
            )}
        </div>
    );
};

export default Availability;