// Types
import type { GetOneCityQuery } from "../generated/graphql-types";

type CityFromQuery = NonNullable<GetOneCityQuery["getCityById"]>;

type CityProps = {
    city: CityFromQuery;
};

export default function Description({ city }: CityProps) {

    return (
        <>
            <h2>Description</h2>
            <p>{city.description}</p>
        </>
    )
}