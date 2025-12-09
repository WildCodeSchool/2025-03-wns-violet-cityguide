// React & React Router
import { useParams } from "react-router-dom";
import { useEffect } from "react";

// Components
import Map from "../components/Map.tsx";
import CitySearch from "../components/CitySearch.tsx";

// GraphQL
import { useGetAllCitiesQuery, useGetPoisByCityQuery } from "../generated/graphql-types";

// Zustand - Context
import { useCityStore, useCityAllPoiStore } from "../zustand/cityStore";


export default function City() {
	const {cityId} = useParams<{ cityId: string }>();
	const numericId = Number(cityId);

	// requête pour les villes
	const {
		data: citiesData,
		loading: loadingCities,
		error: errorCities,
	} = useGetAllCitiesQuery();

	// requête pour les POIs
	const {
		data: poisData,
		loading: loadingPois,
		error: errorPois,
	} = useGetPoisByCityQuery({
		variables: { cityId: numericId },
		skip: isNaN(numericId),
	});

	const setCities = useCityStore((s) => s.setCities);
	const setCurrentCity = useCityStore((s) => s.setCurrentCity);
	const setPois = useCityAllPoiStore((s) => s.setPois);

	// remplir les villes + currentCity
	useEffect(() => {
		if (!citiesData?.getAllCities) return;

		const cities = citiesData.getAllCities;
		setCities(cities);

		const current =
			cities.find((c) => c.cityId === numericId) ?? cities[0];

		setCurrentCity(current);
	}, [citiesData, numericId, setCities, setCurrentCity]);

	// remplir les POIs dans Zustand
	useEffect(() => {
		if (!poisData?.getPoisByCity) return;
		setPois(poisData.getPoisByCity);
	}, [poisData, setPois]);

	const currentCity = useCityStore((s) => s.currentCity);

	if (loadingCities || loadingPois) return <p>Loading...</p>;
	if (errorCities || errorPois) return <p>Erreur de chargement</p>;
	if (!citiesData?.getAllCities) return <p>Aucune ville trouvée</p>;
	if (!currentCity) return <p>Ville introuvable</p>;

	return (
		<section className="city">
			<CitySearch />
			<Map />
		</section>
	)
}
