// React & React Router
import { useParams } from "react-router-dom";
import { useEffect } from "react";

// Components
import Map from "../components/Map.tsx";
import CitySearch from "../components/CitySearch.tsx";

// GraphQL
import {useGetAllCitiesQuery} from "../generated/graphql-types";

// Zustand - Context
import { useCityStore } from "../zustand/cityStore";


export default function City() {
	const {cityId} = useParams<{ cityId: string }>();
	const numericId = Number(cityId);

	const {data, loading, error} = useGetAllCitiesQuery();

	const setCities = useCityStore((s) => s.setCities);
	const setCurrentCity = useCityStore((s) => s.setCurrentCity);

	useEffect(() => {
		if (!data?.getAllCities) return;

		const cities = data.getAllCities;
		setCities(cities);

		const current =
			cities.find((c) => c.cityId === numericId) ?? cities[0];

		setCurrentCity(current);
	}, [data, numericId, setCities, setCurrentCity]);

	const currentCity = useCityStore((s) => s.currentCity);

	if (loading) return <p>Loading...</p>;
	if (error || !data || !data.getAllCities) return <p>Aucune ville trouvée</p>;
	if (!currentCity) return <p>Ville introuvable</p>;

	return (
		<section className="city">
			<CitySearch />
			<Map />
		</section>
	)
}
