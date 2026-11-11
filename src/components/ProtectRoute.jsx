import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import NoPermission from "../webpage/NoPermission";

const ProtectedRoute = () => {
    const { user } = useAuth();

    if (!user) {
        return <NoPermission />;
    }

    return <Outlet />;
};

export default ProtectedRoute;