const BookingCardProps = ({ booking }) => {
    const { resourceId, bookedBy, startsAt, endsAt } = booking;

    return (
        <div>
            <h3>Booking</h3>
            <p>Resource: {resourceId}</p>
            <p>Booked by: {bookedBy}</p>
            <p>Starts at: {startsAt}</p>
            <p>Ends at: {endsAt}</p>
        </div>
    );
};

export default BookingCardProps