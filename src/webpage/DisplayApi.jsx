import { useEffect, useState } from "react";
import api from "../api/api";

const DisplayApi = () => {
    const [resources, setResources] = useState([]);

    useEffect(() => {
        const getResources = async () => {
            const response = await api.get("/resources");
            setResources(response.data);
            console.log(response.data)
        };

        getResources();
    }, []);

    return (
        <div>
            <h1>Display resources API</h1>
            {resources.map((resource) => (
                <div key={resource._id}>
                    <p>Name: {resource.name}</p>
                    <p>Type: {resource.type}</p>
                    <p>Description: {resource.description}</p>
                    <p>Capacity: {resource.capacity}</p>
                    <p>Active: {resource.active ? "Yes" : "No"}</p>
                    <p>Created at: {resource.createdAt}</p>
                </div>
            ))}
        </div>
    );
};

export default DisplayApi;