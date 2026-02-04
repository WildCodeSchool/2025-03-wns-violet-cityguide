// React & React-Router
import { Navigate, Outlet, useLocation } from "react-router-dom";

// Zustand
import { useUserStore } from "./userStore";

// Types
import type { Role } from "../generated/graphql-types"
type authorized = {
    allowedRoles?: Role[];
    redirectToWhenLoggedOut?: string
};

export default function RequireAuth({ allowedRoles, redirectToWhenLoggedOut = "/"}: authorized) {
    const isAuthenticated = useUserStore((state) => state.isAuthenticated);
    const roles = useUserStore((state) => state.roles);
    const isReady = useUserStore((state) => state.isAuthStoreReady);
    const location = useLocation();

    if (!isReady) return null;



    if (!isAuthenticated) {
        return <Navigate to={redirectToWhenLoggedOut} replace state={{ from: location }} />;
    }

    if (allowedRoles && !allowedRoles.some((role: Role) => roles?.includes(role))) {
        return <Navigate to="/unauthorized" replace state={{ from: location }} />;
    }

    return <Outlet />;
}