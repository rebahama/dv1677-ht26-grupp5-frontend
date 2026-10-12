const BookingDetailsProps = ({ booking }) => {
    const {
        _id,
        resourceId,
        bookedBy,
        startsAt,
        endsAt,
        status,
        createdAt
    } = booking;

    return (
        <div>
            <h2>Booking information</h2>
            <p>Booking ID: {_id}</p>
            <p>Resource ID: {resourceId}</p>
            <p>Booked by: {bookedBy}</p>
            <p>Starts at: {new Date(startsAt).toLocaleString()}</p>
            <p>Ends at: {new Date(endsAt).toLocaleString()}</p>
            {status && <p>Status: {status}</p>}
            {createdAt && (
                <p>
                    Created at: {new Date(createdAt).toLocaleString()}
                </p>
            )}
        </div>
    );
};

export default BookingDetailsProps;