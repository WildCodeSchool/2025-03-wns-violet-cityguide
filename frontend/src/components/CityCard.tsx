// React & React Router
import { useNavigate } from "react-router-dom";

// Types
import type { GetAllCitiesQuery } from "../generated/graphql-types";

type CityFromQuery = NonNullable<GetAllCitiesQuery["getAllCities"]>[number];

type CityCardProps = {
    city: CityFromQuery;
};

export default function CityCard({ city }: CityCardProps) {
    const navigate = useNavigate();

    return (
        <section className="cityCard" onClick={() => navigate(`/city/${city.cityId}`)}>
            <div className="cityCard__imgContainer">
                <img className="cityCard__imgContainer__img" src={city.imageUrl} alt={city.cityName} />
            </div>
            <div className="cityCard__text">
                <h2 className="cityCard__text__title">{city.cityName}</h2>
                <p className="cityCard__text__description">{city.description}</p>
            </div>
        </section>
    )
}