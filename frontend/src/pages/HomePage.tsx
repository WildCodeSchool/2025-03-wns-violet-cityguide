// React
import { useEffect } from "react";

// React UseHook
import { useWindowSize } from "@uidotdev/usehooks";

// Components
import CityCard from "../components/CityCard.tsx";
import Carousel from "../components/Carousel.tsx";

// GraphQL
import { useGetAllCitiesQuery } from "../generated/graphql-types";

// Types
import type { City } from "../types/CityType";

function Browser({ size }) {
	return (
		<div
			data-testid="browser"
			className="browser"
			style={{ width: size.width / 4, height: size.height / 4 }}
		/>
	);
}

export default function HomePage() {
	const { data, loading, error } = useGetAllCitiesQuery();

	const size = useWindowSize();

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

	const citiesCards: Array<City> = data?.getAllCities ?? [];

	return (
		<>
			<h2 className="heroBanner">Découvrez les points d'intérêts de votre ville</h2>
			<section className="cityCards" id="cities">
				{citiesCards.length === 0 ? (
					<p>Aucune ville trouvée</p>
				) : (
					<Carousel visibleCount={4}>
						{citiesCards.map((currCity) => (
							<CityCard key={currCity.cityId} city={currCity} />
						))}
					</Carousel>
				)}
			</section>
		</>
	)
}