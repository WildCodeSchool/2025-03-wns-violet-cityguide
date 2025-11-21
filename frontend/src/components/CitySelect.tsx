// Types
import type { GetAllCitiesQuery } from "../generated/graphql-types";


type CitiesFromQuery = GetAllCitiesQuery["getAllCities"][number];

type CityProps = {
    city: CitiesFromQuery[];
};

export default function CitySelect({ city }: CityProps) {

    return (
        <>
            <select>
                {city.map((currCity) => (
                    <option key={currCity.cityId} value={currCity.cityId}>
                        {currCity.cityName}
                    </option>
                ))}
            </select>
        </>
    )
}