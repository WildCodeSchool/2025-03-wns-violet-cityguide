import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { type UserProfile } from "../types/types";

type State = {
    user: UserProfile | null;
    login: (user: UserProfile) => void;
    logout: () => void;
};

export const useUserStore = create<State>()(
    devtools(
        persist(
        (set) => ({
            user: null,
            login: (newUser) => set(() => ({user: newUser})),
            logout: () => set({user: null}),
            // signup: () => {},
        }), {
            name: "user-store",
        }
        )
    )
);

export const useCurrentUser = () => useUserStore((set) => set.user);
export const useLogin = () => useUserStore((set) => set.login);
export const useLogout = () => useUserStore((set) => set.logout);