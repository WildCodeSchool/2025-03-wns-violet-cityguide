import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useCookieConsent } from '../hooks/useCookieConsent';

const RequireConsent = () => {
    const { hasConsent } = useCookieConsent();
    const location = useLocation();

    // Si pas de consentement et pas sur une page autorisée, rediriger vers welcome
    if (!hasConsent) {
        return <Navigate to='/' replace state={{ from: location }} />;
    }

    return <Outlet />;
};

export default RequireConsent;