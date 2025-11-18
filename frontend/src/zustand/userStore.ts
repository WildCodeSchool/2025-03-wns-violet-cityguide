// Zustand - Context
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

// Types
import { type State, type Actions } from "../types/authentication.ts";

export const useUserStore = create<State & Actions>()(
    devtools(
        persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            login: (profile) =>
                set({
                    user: profile.user ?? null,
                    token: profile.token ?? null,
                    isAuthenticated: !!profile.user && !!profile.token,
                }),
            logout: () => set({ user: null, token: null, isAuthenticated: false }),
        }), {
            name: "user-store",
        }
        )
    )
);

export const useCurrentUser = () => useUserStore((set) => set.user);
export const useIsAuthenticated = () => useUserStore((set) => set.isAuthenticated);
export const useToken = () => useUserStore((set) => set.token);
export const useLogin = () => useUserStore((set) => set.login);
export const useLogout = () => useUserStore((set) => set.logout);