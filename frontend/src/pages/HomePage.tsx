// React
import { useEffect } from "react";

// Components
import CityCard from "../components/CityCard.tsx";
import Carousel from "../components/Carousel";
// import SearchBar from "../components/SearchBar.tsx";

// GraphQL
import { useGetAllCitiesQuery } from "../generated/graphql-types";



export default function HomePage() {
	const { data, loading, error } = useGetAllCitiesQuery();

	const windowSize = window.innerWidth;

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

	const citiesCards = data?.getAllCities ?? [];

	return (
		<>
			<h2 className="heroBanner">Découvrez les points d'intérêts de votre ville</h2>
			<section id="cities">
				{/*<SearchBar cities={cities} currentCity={currentCity} onSelectCity={handleSelectCity} errorMessage={"Aucune ville trouvée"} />*/}
				{windowSize < 768 ? (
					<section className="cities-mobile">
						{citiesCards.map((currCity) => (
							<CityCard key={currCity.cityId} city={currCity}/>
						))}
					</section>

				) : (
					<Carousel visibleCount={4}>
						{citiesCards.map((currCity) => (
							<CityCard key={currCity.cityId} city={currCity}/>
						))}
					</Carousel>
				)}
			</section>
		</>
	)
}