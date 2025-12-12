// React & React Router
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

// Components
import CityMap from "../components/Map.tsx";
import SearchBar from "../components/SearchBar.tsx";
import CategorySelect from "../components/CategorySelect.tsx";

// GraphQL
import { useGetPoisByCityAndCategoryQuery, useGetAllCitiesQuery, useGetPoisByCityQuery, type GetAllCitiesQuery } from "../generated/graphql-types";

// Zustand - Context
import { useCityStore, useCityAllPoiStore,  useCityCategoryStore } from "../zustand/cityStore";

// Types
export type CityType = GetAllCitiesQuery["getAllCities"][number];

export default function City() {
	const { cityId } = useParams<{ cityId: string }>();
	const numericId = Number(cityId);

	const {
		data: citiesData,
		loading: loadingCities,
		error: errorCities,
	} = useGetAllCitiesQuery();

	const {
		data: poisData,
		loading: loadingPois,
		error: errorPois,
	} = useGetPoisByCityQuery({
		variables: { cityId: numericId },
		skip: isNaN(numericId),
	});

	const navigate = useNavigate();

	const cities = useCityStore((s) => s.cities);
	const currentCity = useCityStore((s) => s.currentCity);

	const setCities = useCityStore((s) => s.setCities);
	const setCurrentCity = useCityStore((s) => s.setCurrentCity);
	const setPois = useCityAllPoiStore((s) => s.setPois);

	// remplir les villes + currentCity
	useEffect(() => {
		if (!citiesData?.getAllCities) return;

		const citiesFromApi = citiesData.getAllCities;
		setCities(citiesFromApi);

		const current =
			citiesFromApi.find((c) => c.cityId === numericId) ?? citiesFromApi[0];

		setCurrentCity(current);
	}, [citiesData, numericId, setCities, setCurrentCity]);

	// remplir les POIs dans Zustand
	useEffect(() => {
		if (!poisData?.getPoisByCity) return;
		setPois(poisData.getPoisByCity);
	}, [poisData, setPois]);

	const handleSelectCity = (city: CityType) => {
		navigate(`/city/${city.cityId}`);
	};

	const selectedCategoryId = useCityCategoryStore((s) => s.selectedCategoryId);
	const setSelectedCategoryId = useCityCategoryStore((s) => s.setSelectedCategoryId);
	const setCategoriesPois = useCityCategoryStore((s) => s.setPoisByCategory);

	// pois filtrés par ville + catégorie
	const { data: poisByCityAndCategoryData } = useGetPoisByCityAndCategoryQuery({
		variables: {
			cityId: numericId,
			categoryId: selectedCategoryId ?? 0,
		},
		skip: isNaN(numericId) || selectedCategoryId == null,
	});

	useEffect(() => {
		if (!poisByCityAndCategoryData?.getPoisByCityAndCategory) return;
		setCategoriesPois(poisByCityAndCategoryData.getPoisByCityAndCategory);
	}, [poisByCityAndCategoryData, setCategoriesPois]);

	useEffect(() => {
		setSelectedCategoryId(null);
	}, [numericId, setSelectedCategoryId]);

	const allPois = useCityAllPoiStore((s) => s.pois);

	const categories = Array.from(
		new Map(
			allPois
				.filter((p) => p.poiCategory)
				.map((p) => [
					p.poiCategory!.categoryId,
					{ categoryId: p.poiCategory!.categoryId, categoryName: p.poiCategory!.categoryName },
				])
		).values()
	);

	if (loadingCities || loadingPois) return <p>Loading...</p>;
	if (errorCities || errorPois) return <p>Erreur de chargement</p>;
	if (!citiesData?.getAllCities) return <p>Aucune ville trouvée</p>;
	if (!currentCity) return <p>Ville introuvable</p>;

	return (
		<section className="city">
			<SearchBar
				cities={cities}
				currentCity={currentCity}
				onSelectCity={handleSelectCity}
				errorMessage={"Aucune ville trouvée"}
			/>
			<CategorySelect
				categories={categories}
				value={selectedCategoryId}
				onChange={setSelectedCategoryId}
			/>
			<CityMap />
		</section>
	);
}
