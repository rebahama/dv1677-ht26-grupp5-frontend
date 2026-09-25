import axios from "axios";

const api = axios.create({
    baseURL: "https://dv1677-spock.nplab.bth.se/",
});

export default api;