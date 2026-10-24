import { useEffect, useState } from "react";
import api from "../api/api";

const Availability = ({ resourceId, onSelectSlot, resourceType }) => {
    const [date, setDate] = useState("");
    const [availableTimes, setAvailableTimes] = useState([]);
    const [bookedTimes, setBookedTimes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [endDate, setEndDate] = useState("");
    const [selectedSlot, setSelectedSlot] = useState("");
    const today = new Date();
    const minDate = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, "0"),
        String(today.getDate()).padStart(2, "0"),
    ].join("-");

    const selectMaasDates = (startDate, finishDate) => {
        if (!startDate || !finishDate || finishDate < startDate) {
            onSelectSlot("", "");
            return;
        }
        const startsAt = new Date(`${startDate}T00:00:00.000Z`);
        const endsAt = new Date(`${finishDate}T00:00:00.000Z`);
        onSelectSlot(startsAt.toISOString(), endsAt.toISOString());
    };

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
        const isAvailable =
            resourceType === "proxmox" ||
                resourceType === "openstack"
                ? true
                : availableTimes.some(
                    (time) =>
                        new Date(time.startsAt).getTime() <= startsAt &&
                        new Date(time.endsAt).getTime() >= endsAt
                );
        return {
            label: `${String(hour).padStart(2, "0")}:00–${String(hour + 1).padStart(2, "0")}:00`,
            startsAt,
            endsAt,
            isBooked,
            isAvailable:
                resourceType === "maas"
                    ? isAvailable && !isBooked
                    : isAvailable,
        };
    });

    const selectSlot = (slot) => {
        if (!slot.isAvailable || (resourceType === "maas" && slot.isBooked)) {
            return;
        }

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

        const startsAt = toDateTime(slot.startsAt);
        const endsAt = toDateTime(slot.endsAt);


        setSelectedSlot(slot.label);
        onSelectSlot(startsAt, endsAt);
    };

    const handleMaasStartDate = (event) => {
        const start = event.target.value;
        setDate(start);
        setSelectedSlot("");

        const validEndDate =
            endDate && endDate >= start ? endDate : "";

        setEndDate(validEndDate);
        selectMaasDates(start, validEndDate);
    };

    const handleMaasEndDate = (event) => {
        const end = event.target.value;
        setEndDate(end);
        selectMaasDates(date, end);
    };

    return (
        <div className="mb-4">
            <h5>Equipment Availability</h5>

            {resourceType === "maas" ? (
                <>
                    <div className="mb-3">
                        <label htmlFor="maas-start-date" className="form-label">
                            Start date
                        </label>
                        <input
                            id="maas-start-date"
                            type="date"
                            className="form-control"
                            value={date}
                            min={minDate}
                            onChange={handleMaasStartDate}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="maas-end-date" className="form-label">
                            End date
                        </label>
                        <input
                            id="maas-end-date"
                            type="date"
                            className="form-control"
                            value={endDate}
                            min={date || minDate}
                            onChange={handleMaasEndDate}
                            required
                        />
                    </div>
                </>
            ) : (
                <>
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
                    {!date && <p>Select a date to see available times.</p>}
                    {!loading && date && !error && (
                        <>
                            <p className="text-info">
                                Selected booking date: {date}
                            </p>
                            <div className="d-flex flex-wrap gap-2">
                                {slots.map((slot) => {
                                    const selected =
                                        selectedSlot === slot.label;
                                    const color = slot.isBooked
                                        ? "warning"
                                        : !slot.isAvailable
                                            ? "danger"
                                            : "success";
                                    return (
                                        <button
                                            key={slot.label}
                                            type="button"
                                            className={`btn btn-outline-${color}${selected ? " active" : ""
                                                }`}
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
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Availability;