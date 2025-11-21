// React & React Router
import {useParams} from "react-router-dom";

// Components
import Map from "../components/Map.tsx";
import CitySelect from "../components/CitySelect.tsx";

// GraphQL
import {useGetOneCityQuery} from "../generated/graphql-types";

export default function City() {
    const {cityId} = useParams<{ cityId: string }>();

    const numericId = Number(cityId);

    const {data, loading, error} = useGetOneCityQuery({
        variables: {
            getCityByIdId: numericId,
        },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    if (!data || !data.getCityById) return <p>Ville introuvable</p>;

    const city = data.getCityById;

    return (
        <section className="city">
            <CitySelect city={city}/>
            <Map />
        </section>
    )
}
