// React & React Router
import { useState, useMemo, useEffect, type FormEvent } from "react";

// GraphQL
import { type GetAllCitiesQuery } from "../generated/graphql-types";

// Types
type CityType = GetAllCitiesQuery["getAllCities"][number];

type SearchBarProps = {
	cities: CityType[];
	currentCity?: CityType | null;
	onSelectCity: (city: CityType) => void;
	errorMessage?: string;
};

export default function SearchBar({ cities, currentCity, onSelectCity, errorMessage }: SearchBarProps) {
	const [query, setQuery] = useState(currentCity?.cityName ?? "");
	const [showList, setShowList] = useState(false);

	// Met à jour l’input si la ville courante change
	useEffect(() => {
		setQuery(currentCity?.cityName ?? "");
	}, [currentCity]);

	const filteredCities = useMemo(() => {
		const trimmed = query.trim().toLowerCase();

		if (!trimmed) return cities;

		return cities.filter((city) =>
			city.cityName.toLowerCase().includes(trimmed)
		);
	}, [query, cities]);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		const trimmed = query.trim().toLowerCase();
		if (!trimmed) return;

		const exactMatch =
			cities.find((city) => city.cityName.toLowerCase() === trimmed) ||
			filteredCities[0];

		if (exactMatch) {
			onSelectCity(exactMatch);
			setShowList(false);
		}
	};

	return (
		<div className="city__search">
			<form onSubmit={handleSubmit} className="city__search__form">
				<input
					type="text"
					placeholder="Rechercher une ville..."
					value={query}
					onChange={(e) => {
						setQuery(e.target.value);
						setShowList(true);
					}}
					onClick={() => setShowList(true)}
				/>
			</form>

			{showList && (
				<ul className="city__search__list">
					{filteredCities.length === 0 &&
						<div className="city__search__list__results">
							<li>{errorMessage}</li>
						</div>
					}
					{filteredCities.map((city) => (
						<div className="city__search__list__results">
							<li
								key={city.cityId}
								onClick={() => {
									onSelectCity(city);
									setQuery(city.cityName);
									setShowList(false);
								}}
								style={{ cursor: "pointer" }}
							>
								{city.cityName}
							</li>
						</div>
					))}
				</ul>
			)}
		</div>
	);
}
