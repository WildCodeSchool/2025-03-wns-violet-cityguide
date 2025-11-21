// React & React Router
import {useParams} from "react-router-dom";

// Components
import Map from "../components/Map.tsx";
import CitySearch from "../components/CitySearch.tsx";

// GraphQL
import {useGetAllCitiesQuery} from "../generated/graphql-types";

export default function City() {
    const {cityId} = useParams<{ cityId: string }>();
    const numericId = Number(cityId);

    const {data, loading, error} = useGetAllCitiesQuery();

    if (loading) return <p>Loading...</p>;
    if (error || !data || !data.getAllCities) return <p>Aucune ville trouvée</p>;

    const cities = data.getAllCities;
    const currentCity =
        cities.find((c) => c.cityId === numericId) ?? cities[0];

    return (
        <section className="city">
            <CitySearch cities={cities} currentCity={currentCity} />
            <Map city={currentCity} />
        </section>
    )
}
