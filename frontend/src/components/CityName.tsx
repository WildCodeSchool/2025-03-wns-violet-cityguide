// Types
import type { GetOneCityQuery } from "../generated/graphql-types";

type CityFromQuery = NonNullable<GetOneCityQuery["getCityById"]>;

type CityProps = {
    city: CityFromQuery;
};

export default function CityName({ city }: CityProps) {

    return (
        <>
            <h1>{city.cityName}</h1>
        </>
    )
}