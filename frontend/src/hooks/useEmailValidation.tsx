import { useMemo } from "react";

type EmailValidation = {
    isValid: boolean;
    hasAtSymbol: boolean;
    hasValidDomain: boolean;
    hasNoSpaces: boolean;
    hasMinLength: boolean;
};

export function useEmailValidation(email: string): EmailValidation {
    return useMemo(() => {
        const hasMinLength = email.length >= 2;
        const hasAtSymbol = email.includes("@");
        const hasNoSpaces = !/\s/.test(email);

        // Vérifie si il a un quelquechose.com par exemple
        const hasValidDomain = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        return {
            isValid:
                hasMinLength &&
                hasAtSymbol &&
                hasNoSpaces &&
                hasValidDomain,
            hasMinLength,
            hasAtSymbol,
            hasNoSpaces,
            hasValidDomain,
        };
    }, [email]);

}
