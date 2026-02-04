import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCookieConsent } from '../hooks/useCookieConsent';

interface CookieProtectionProps {
    children: React.ReactNode;
}

const CookieProtection: React.FC<CookieProtectionProps> = ({ children }) => {
    const { hasConsent } = useCookieConsent();
    const navigate = useNavigate();
    const location = useLocation();

    // Pages autorisées sans consentement
    const allowedPaths = ['/', '/login', '/signup'];
    const isAllowedPath = allowedPaths.includes(location.pathname);

    useEffect(() => {
        // Si pas de consentement et pas sur une page autorisée, rediriger vers welcome
        if (!hasConsent && !isAllowedPath) {
            navigate('/', { replace: true });
        }
    }, [hasConsent, isAllowedPath, navigate]);

    // Si pas de consentement et pas sur une page autorisée, ne rien afficher
    if (!hasConsent && !isAllowedPath) {
        return null;
    }

    return <>{children}</>;
};

export default CookieProtection;