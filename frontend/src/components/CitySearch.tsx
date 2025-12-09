// React & React Router
import { useState, useMemo, useEffect, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

// Zustand - Context
import { useCityStore } from "../zustand/cityStore";

export default function CitySearch() {
	const navigate = useNavigate();
	const cities = useCityStore((s) => s.cities);
	const currentCity = useCityStore((s) => s.currentCity);

	const [query, setQuery] = useState(currentCity?.cityName ?? "");

	// Met à jour l’input si la ville courante change
	useEffect(() => {
		setQuery(currentCity?.cityName ?? "");
	}, [currentCity]);

	const filteredCities = useMemo(() => {
		const trimmed = query.trim().toLowerCase();
		if (trimmed.length < 3) return [];
		return cities.filter((city) =>
				city.cityName.toLowerCase().includes(trimmed)
		);
	}, [query, cities]);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		const trimmed = query.trim().toLowerCase();
		if (!trimmed) return;

		const exactMatch =
			cities.find(
				(city) => city.cityName.toLowerCase() === trimmed
			) || filteredCities[0];

		if (exactMatch) {
			navigate(`/city/${exactMatch.cityId}`);
		}
	};

	return (
		<div className="city__search">
			<form onSubmit={handleSubmit} className="city__search__form">
				<input
					type="text"
					placeholder="Rechercher une ville..."
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
				<button type="submit">Recherche</button>
			</form>

			{query.length >= 3 && (
				<ul className="city__search__results">
					{filteredCities.length === 0 && <li>Aucune ville trouvée.</li>}

					{filteredCities.map((city) => (
						<li
							key={city.cityId}
							onClick={() => navigate(`/city/${city.cityId}`)}
							style={{ cursor: "pointer" }}
						>
							{city.cityName}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
