const ResourceDetailProp = ({ resource }) => {
    const { _id, name, provider, capacity } = resource;
    const { vcpus, ramMb, diskGb } = capacity || {};
    return (
        <div className="card shadow-sm mb-4">
            <div className="card-header bg-primary text-white">
                <h5 className="mb-0">{name}</h5>
            </div>
            <div className="card-body">
                <div className="row g-3">
                    <div className="col-md-6">
                        <p className="mb-2">
                            <strong>ID:</strong> {_id}
                        </p>
                        <p className="mb-2">
                            <strong>Provider:</strong>{" "}
                            <span className="badge bg-info text-dark">
                                {provider}
                            </span>
                        </p>
                    </div>
                    <div className="col-md-6">
                        <p className="mb-2">
                            <strong>vCPUs:</strong> {vcpus}
                        </p>
                        <p className="mb-2">
                            <strong>RAM:</strong> {Math.round(ramMb)} MB
                        </p>
                        {diskGb != null && (
                            <p className="mb-2">
                                <strong>Disk:</strong> {Math.round(diskGb)} GB
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResourceDetailProp;