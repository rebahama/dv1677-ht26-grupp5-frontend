import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Availability from "./Availability";
import Capacity from "./Capacity";
import api from "../api/api";

const CreateBooking = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [resource, setResource] = useState(null);
    const [startsAt, setStartsAt] = useState("");
    const [endsAt, setEndsAt] = useState("");
    const [vcpus, setVcpus] = useState(1);
    const [ramMb, setRamMb] = useState(1024);
    const [diskGb, setDiskGb] = useState(10);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const getResource = async () => {
            try {

                const response = await api.get(`/resources/${id}`);
                setResource(response.data.resource ?? response.data);
            } catch (error) {
                console.error("Could not load resource:", error);
                setMessage("Could not load resource details.");
            }
        };

        getResource();
    }, [id]);

    const handleSelectSlot = (start, end) => {
        setStartsAt(start);
        setEndsAt(end);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage("");

        if (!startsAt || !endsAt) {
            setMessage("Please select a start and end date.");
            return;
        }

        if (new Date(endsAt) <= new Date(startsAt)) {
            setMessage("The end time must be after the start time.");
            return;
        }

        if (!resource) {
            setMessage("Resource details are still loading.");
            return;
        }

        const bookingData = {
            resourceId: id,
            startsAt: new Date(startsAt).toISOString(),
            endsAt: new Date(endsAt).toISOString(),
        };

        if (resource.provider === "proxmox") {
            bookingData.want = {
                vcpus: Number(vcpus),
                ramMb: Number(ramMb),
                diskGb: Number(diskGb),
            };
        } else if (resource.provider === "openstack") {
            bookingData.want = {
                vcpus: Number(vcpus),
                ramMb: Number(ramMb),
            };
        } else if (resource.provider !== "maas") {
            setMessage("Unsupported resource provider.");
            return;
        }

        try {
            setLoading(true);
            const response = await api.post(
                "/bookings",
                bookingData
            );

            setMessage("Booking created successfully!");
            navigate("/bookings");
        } catch (error) {
            console.error("Backend response:", error.response?.data);

            const code = error.response?.data?.code;

            if (code === "CAPACITY_EXCEEDED") {
                setError("Booking denied: Not enough capacity available at the moment");
            } else if (code === "ALREADY_BOOKED") {
                setError("Booking denied: This machine is already booked for the period");
            } else {
                setError(
                    error.response?.data?.error ||
                    "Could not create booking. Please try again."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="card shadow-sm border-0">
                        <div className="card-body p-4 p-md-5">
                            <p> Creating booking for {resource?.name} with external id: {resource?.externalId} </p>
                            <Capacity resource={resource} />
                            {resource && (
                                <Availability
                                    resourceId={resource._id}
                                    resourceType={resource.provider}
                                    onSelectSlot={handleSelectSlot}
                                />
                            )}
                            <form onSubmit={handleSubmit}>
                                {resource?.provider !== "maas" && resource && (
                                    <>
                                        <hr className="my-4" />
                                        <h2 className="h5 mb-3">
                                            Resource requirements
                                        </h2>
                                        <div className="mb-3">
                                            <label htmlFor="vcpus" className="form-label fw-semibold">
                                                vCPUs
                                            </label>
                                            <input
                                                id="vcpus"
                                                type="number"
                                                className="form-control"
                                                min="1"
                                                value={vcpus}
                                                onChange={(e) => setVcpus(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="ramMb" className="form-label fw-semibold">
                                                RAM (MB)
                                            </label>
                                            <input
                                                id="ramMb"
                                                type="number"
                                                className="form-control"
                                                min="1"
                                                value={ramMb}
                                                onChange={(e) => setRamMb(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </>
                                )}
                                {resource?.provider === "proxmox" && (
                                    <div className="mb-4">
                                        <label htmlFor="diskGb" className="form-label fw-semibold">
                                            Disk (GB)
                                        </label>
                                        <input
                                            id="diskGb"
                                            type="number"
                                            className="form-control"
                                            min="1"
                                            value={diskGb}
                                            onChange={(e) => setDiskGb(e.target.value)}
                                            required
                                        />
                                    </div>
                                )}
                                {message && (
                                    <div
                                        className="alert alert-info mt-3"
                                        role="status"
                                    >
                                        {message}
                                    </div>
                                )}

                                {error && (
                                    <div
                                        className="alert alert-info mt-3"
                                        role="status"
                                    >
                                        {error}
                                    </div>
                                )}
                                <div className="d-grid mt-4">
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-lg"
                                        disabled={loading || !resource}
                                    >
                                        {loading ? "Creating booking..." : "Create booking"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateBooking;