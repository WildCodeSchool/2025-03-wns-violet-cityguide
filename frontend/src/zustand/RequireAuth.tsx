// React & React-Router
import { Navigate, Outlet, useLocation } from "react-router-dom";

// Zustand
import { useIsAuthenticated } from "./userStore";

export default function RequireAuth() {
    const isAuthenticated = useIsAuthenticated();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return <Outlet />;
}