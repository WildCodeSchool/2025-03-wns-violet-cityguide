// Zustand - Context
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

// Types
import { type State, type Actions } from "../types/authentication.ts";

let setFromStore: ((partial: Partial<State & Actions>) => void) | null = null;

export const useUserStore = create<State & Actions>()(
	devtools(
		persist(
			(set) => {
				// on capture set une fois au moment de créer le store
				setFromStore = set;

				return {
					user: null,
					roles: [],
					token: null,
					isAuthenticated: false,
					isAuthStoreReady: false,

					login: (profile) =>
						set({
							user: profile.user ?? null,
							roles: profile.roles ?? profile.user?.roles ?? [],
							token: profile.token ?? null,
							isAuthenticated: !!profile.user && !!profile.token,
						}),
					logout: () =>
						set({
							user: null,
							roles: [],
							token: null,
							isAuthenticated: false,
						}),
				};
			},
			{
				name: "user-store",
				onRehydrateStorage: () => (_state, error) => {
					if (error) {
						console.error("[zustand] rehydrate error", error);
					}
					setFromStore?.({ isAuthStoreReady: true });
				},
			}
		)
	)
);

export const useCurrentUser = () => useUserStore((state) => state.user);
export const useIsAuthenticated = () => useUserStore((set) => set.isAuthenticated);
export const useToken = () => useUserStore((set) => set.token);
export const useLogin = () => useUserStore((set) => set.login);
export const useLogout = () => useUserStore((set) => set.logout);
