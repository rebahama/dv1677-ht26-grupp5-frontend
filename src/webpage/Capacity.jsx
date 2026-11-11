import { useEffect, useState } from "react";
import api from "../api/api";

const Capacity = ({ resource }) => {
    const [capacity, setCapacity] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!resource?.provider) return;
        const getCapacity = async () => {
            try {
                setLoading(true);
                setError("");
                const response = await api.get(
                    `resources/${resource.provider}/availability`
                );
                setCapacity(response.data);
            } catch (error) {
                console.error("Could not load capacity:", error);
                setError("Could not load available capacity.");
            } finally {
                setLoading(false);
            }
        };

        getCapacity();
    }, [resource?.provider]);

    if (!resource?.provider) return null;
    if (loading) return <p>Loading capacity...</p>;
    if (error) return <p className="text-danger">{error}</p>;
    if (!capacity) return null;

    return (
        <div className="card shadow-sm mb-4">
            <div className="card-header bg-secondary text-white">
                <h5 className="mb-0 text-center">Available Capacity</h5>
            </div>
            <div className="card-body">
                {resource.provider === "proxmox" && (
                    <div className="row g-3">
                        <div className="col-12 col-md-4">
                            <div className="border rounded p-3 text-center h-100">
                                <div className="text-muted small">vCPUs</div>
                                <h4 className="mb-0">{Math.round(capacity.vcpus)}</h4>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="border rounded p-3 text-center h-100">
                                <div className="text-muted small">RAM</div>
                                <h4 className="mb-0">{Math.round(capacity.ramMb)} MB</h4>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="border rounded p-3 text-center h-100">
                                <div className="text-muted small">Disk</div>
                                <h4 className="mb-0">{Math.round(capacity.diskGb)} GB</h4>
                            </div>
                        </div>
                    </div>
                )}
                {resource.provider === "openstack" && (
                    <div className="row g-3">
                        <div className="col-12 col-md-6">
                            <div className="border rounded p-3 text-center h-100">
                                <div className="text-muted small">vCPUs</div>
                                <h4 className="mb-0">{Math.round(capacity.vcpus)}</h4>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="border rounded p-3 text-center h-100">
                                <div className="text-muted small">RAM</div>
                                <h4 className="mb-0">{Math.round(capacity.ramMb)} MB</h4>
                            </div>
                        </div>
                    </div>
                )}
                {resource.provider === "maas" && (
                    <>
                        <div className="mb-3">
                            <span className="text-muted">Available machines: </span>
                            <span className="badge bg-success fs-6">
                                {capacity.machines?.length ?? 0}
                            </span>
                        </div>
                        <div className="row g-3">
                            {capacity.machines?.map((machine) => (
                                <div className="col-12 col-md-6" key={machine.id}>
                                    <div className="border rounded p-3 h-100">
                                        <h6 className="mb-3">{machine.name}</h6>
                                        <p className="mb-1">
                                            <span className="text-muted">vCPUs:</span>{" "}
                                            <strong>{Math.round(machine.capacity.vcpus)}</strong>
                                        </p>
                                        <p className="mb-0">
                                            <span className="text-muted">RAM:</span>{" "}
                                            <strong>{Math.round(machine.capacity.ramMb)} MB</strong>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Capacity;