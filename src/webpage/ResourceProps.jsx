const ResourceDetailProp = ({ resource }) => {
    return (
        <div>
            <p>ID: {resource._id}</p>
            <p>External ID: {resource.externalId}</p>
            <p>Provider: {resource.provider}</p>
            <p>Name: {resource.name}</p>
            <p>Type: {resource.type}</p>
            <p>vCPUs: {resource.capacity?.vcpus}</p>
            <p>RAM: {resource.capacity?.ramMb} MB</p>
            <p>Active: {resource.active ? "Yes" : "No"}</p>
            <p>Created at: {resource.createdAt}</p>
            <p>Synced at: {resource.syncedAt}</p>
        </div>
    );
};

export default ResourceDetailProp;