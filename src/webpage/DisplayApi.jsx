import { useEffect, useState } from "react";
import ResourceProps from "./ResourceProps";
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
                <ResourceProps
                    key={resource._id}
                    resource={resource}
                />
            ))}
        </div>
    );
};

export default DisplayApi;