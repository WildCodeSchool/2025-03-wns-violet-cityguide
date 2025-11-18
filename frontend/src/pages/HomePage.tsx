// React
import { useEffect } from "react";

// Components
import CityCard from "../components/CityCard.tsx";

// GraphQL
import { useGetAllCitiesQuery } from "../generated/graphql-types";

export default function HomePage() {
    const { data, loading, error } = useGetAllCitiesQuery();

    useEffect(() => {
        const target = sessionStorage.getItem("scrollTo");

        if (target) {
            sessionStorage.removeItem("scrollTo");
            const el = document.getElementById(target);

            if (el) {
                setTimeout(() => {
                    el.scrollIntoView({ behavior: "smooth" });
                }, 0);
            }
        }
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <>
            <h2 className="heroBanner">Découvrez les points d'intérêts de votre ville</h2>
            <section className="cityCards" id="cities">
                {data?.getAllCities.map((currCity) => (
                    <CityCard key={currCity.cityId} city={currCity} />
                ))}
            </section>
        </>
    )
}