// React & React Router
import {useParams} from "react-router-dom";

// Components
import MiniMap from "../components/MiniMap";
import CommentsAndRatings from "../components/CommentsAndRatings.tsx";
import PlaceName from "../components/PlaceName";
import Description from "../components/Description";

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
            <div className="city__background">
                <img src={city.imageUrl} className="city__background__img" alt={city.cityName}/>
            </div>
            <MiniMap />
            <div className="city__display">
                <PlaceName city={city} />
                <CommentsAndRatings city={city} />
                <Description city={city} />
            </div>
        </section>
    )
}
