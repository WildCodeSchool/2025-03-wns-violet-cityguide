// Zustand - Context
import { create } from "zustand";

// Types
import type { GetAllCitiesQuery, GetPoisByCityQuery, GetPoisByCityAndCategoryQuery } from "../generated/graphql-types";

type CityFromQuery = GetAllCitiesQuery["getAllCities"][number];
type PoiFromQuery = GetPoisByCityQuery["getPoisByCity"][number];
type PoiFromCategoryAndCityQuery = GetPoisByCityAndCategoryQuery["getPoisByCityAndCategory"][number];

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

interface CityCategoryState {
	selectedCategoryId: number | null;
	setSelectedCategoryId: (id: number | null) => void;
}

interface CityCategoryPoiState {
	poisByCategory: PoiFromCategoryAndCityQuery[];
	currentPoiByCategory: PoiFromCategoryAndCityQuery | null;
	setPoisByCategory: (pois: PoiFromCategoryAndCityQuery[]) => void;
	setCurrentPoiByCategory: (poi: PoiFromCategoryAndCityQuery | null) => void;
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

export const useCityCategoryStore = create<CityCategoryPoiState & CityCategoryState>((set) => ({
	poisByCategory: [],
	currentPoiByCategory: null,
	setPoisByCategory: (pois) => set({ poisByCategory: pois }),
	setCurrentPoiByCategory: (poi) => set({ currentPoiByCategory: poi }),

	selectedCategoryId: null,
	setSelectedCategoryId: (id) => set({ selectedCategoryId: id }),
}));
