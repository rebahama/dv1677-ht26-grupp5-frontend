import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
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
    const { token } = useAuth();

    useEffect(() => {
        const getResource = async () => {
            try {

                const response = await api.get(`/resources/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setResource(response.data.resource ?? response.data);
            } catch (error) {
                console.error("Could not load resource:", error);
                setMessage("Could not load resource details.");
            }
        };

        getResource();
    }, [id]);

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

            const token = localStorage.getItem("token");

            const response = await api.post(
                "/bookings",
                bookingData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setMessage("Booking created successfully!");
            console.log("Booking response:", response.data);

            navigate("/bookings");
        } catch (error) {
            console.error("Create booking error:", error);
            console.error("Backend response:", error.response?.data);
            console.error("HTTP status:", error.response?.status);

            setMessage(
                error.response?.data?.error ||
                error.response?.data?.message ||
                error.message ||
                "Could not create booking."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-4">
            <h1>Create booking</h1>
            <p>Resource ID: {id}</p>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="startsAt" className="form-label">
                        Start date and time
                    </label>
                    <input
                        id="startsAt"
                        type="datetime-local"
                        className="form-control"
                        value={startsAt}
                        onChange={(e) => setStartsAt(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="endsAt" className="form-label">
                        End date and time
                    </label>
                    <input
                        id="endsAt"
                        type="datetime-local"
                        className="form-control"
                        value={endsAt}
                        onChange={(e) => setEndsAt(e.target.value)}
                        min={startsAt || undefined}
                        required
                    />
                </div>
                {resource?.provider !== "maas" && resource && (
                    <>
                        <h5>Resource requirements</h5>
                        <div className="mb-3">
                            <label htmlFor="vcpus" className="form-label">
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
                            <label htmlFor="ramMb" className="form-label">
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
                    <div className="mb-3">
                        <label htmlFor="diskGb" className="form-label">
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
                    <p role="status" className="mb-3">
                        {message}
                    </p>
                )}
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading || !resource}
                >
                    {loading ? "Creating..." : "Create booking"}
                </button>
            </form>
        </div>
    );
};

export default CreateBooking;