import { create } from "zustand"; 


// Types
import type { GetAllCitiesQuery, GetPoisByCityQuery } from "../generated/graphql-types";

type CityFromQuery = GetAllCitiesQuery["getAllCities"][number];
type PoiFromQuery = GetPoisByCityQuery["getPoisByCity"][number];

interface CityState {
	cities: CityFromQuery[];
	currentCity: CityFromQuery | null;
	setCities: (cities: CityFromQuery[]) => void;
	setCurrentCity: (city: CityFromQuery | null) => void;
}

interface CityPoiState {
	pois: PoiFromQuery[];
	currentPoi: PoiFromQuery | null;
	setPois: (pois: PoiFromQuery[]) => void;
	setCurrentPoi: (poi: PoiFromQuery | null) => void;
}

export const useCityStore = create<CityState>((set) => ({
	cities: [],
	currentCity: null,
	setCities: (cities) => set({ cities }),
	setCurrentCity: (city) => set({ currentCity: city }),
}));

export const useCityAllPoiStore = create<CityPoiState>((set) => ({
	pois: [],
	currentPoi: null,
	setPois: (pois) => set({ pois }),
	setCurrentPoi: (poi) => set({ currentPoi: poi }),
}));
