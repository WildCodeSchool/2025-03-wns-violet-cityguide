// Components
import CityCard from "../components/CityCard.tsx";

// GraphQL
import { useGetAllCitiesQuery } from "../generated/graphql-types";

export default function HomePage() {
    const { data, loading, error } = useGetAllCitiesQuery();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <>
            <h2 className="heroBanner">Découvrez les points d'intérêts de votre ville</h2>
            <section className="cityCards">
                {data?.getAllCities.map((currCity) => (
                    <CityCard key={currCity.cityId} city={currCity} />
                ))}
            </section>
        </>
    )
}