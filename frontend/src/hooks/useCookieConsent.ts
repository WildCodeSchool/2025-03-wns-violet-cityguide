import { useCookies } from 'react-cookie';

interface CookieConsent {
    necessary: boolean;
    preferences: boolean;
}

interface UseCookieConsentReturn {
    consent: CookieConsent | null;
    hasConsent: boolean;
    canUsePreferences: boolean;
    resetConsent: () => void;
}

export const useCookieConsent = (): UseCookieConsentReturn => {
    const [cookies, , removeCookie] = useCookies(['cityGuide-consent']);
    
    const consent = cookies['cityGuide-consent'] as CookieConsent | undefined;
    const hasConsent = !!consent;
    const canUsePreferences = consent?.preferences === true;
    
    const resetConsent = () => {
        removeCookie('cityGuide-consent', { path: '/' });
    };
    
    return {
        consent: consent || null,
        hasConsent,
        canUsePreferences,
        resetConsent
    };
};

// Hook pour utiliser les cookies en respectant le consentement
export const useConsentCookies = (cookieNames: string[]) => {
    const [cookies, setCookie, removeCookie] = useCookies(cookieNames);
    const { canUsePreferences } = useCookieConsent();
    
    const setConsentCookie = (name: string, value: unknown, options?: Record<string, unknown>) => {
        const necessaryCookies = ['cityGuide-auth', 'cityGuide-consent'];
        
        const preferenceCookies = ['cityGuide-theme', 'cityGuide-preferences', 'cityGuide-favoriteCategories'];
        
        if (necessaryCookies.includes(name)) {
            setCookie(name, value, options);
        } else if (preferenceCookies.includes(name) && canUsePreferences) {
            setCookie(name, value, options);
        } else {
            console.warn(`Cookie "${name}" bloqué par les préférences de consentement`);
        }
    };
    
    return [cookies, setConsentCookie, removeCookie] as const;
};