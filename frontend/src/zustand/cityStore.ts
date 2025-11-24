// Zustand - Context
import { create } from "zustand";

// Types
import type { GetAllCitiesQuery } from "../generated/graphql-types";

type CityFromQuery = GetAllCitiesQuery["getAllCities"][number];

interface CityState {
	cities: CityFromQuery[];
	currentCity: CityFromQuery | null;
	setCities: (cities: CityFromQuery[]) => void;
	setCurrentCity: (city: CityFromQuery | null) => void;
}

export const useCityStore = create<CityState>((set) => ({
	cities: [],
	currentCity: null,
	setCities: (cities) => set({ cities }),
	setCurrentCity: (city) => set({ currentCity: city }),
}));