import { useMemo } from "react";

type PasswordValidation = {
    isValid: boolean;
    hasMinLength: boolean;
    hasUppercase: boolean;
    hasSpecialChar: boolean;
    hasNumberChar: boolean;
};

export function usePasswordValidation(password: string): PasswordValidation {
    return useMemo(() => {
        const hasMinLength = password.length >= 7;
        const hasUppercase = /[A-Z]/.test(password);
        const hasSpecialChar = /[^a-zA-Z0-9]/.test(password);
        const hasNumberChar = /[0-9]/.test(password);

        return {
            isValid: hasMinLength && hasUppercase && hasSpecialChar,
            hasMinLength,
            hasUppercase,
            hasSpecialChar,
            hasNumberChar,
        };
    }, [password]);
}
