// Components
import Comment from "./Comment";
import StarBar from "./StarBar";

// Types
import type { GetOneCityQuery } from "../generated/graphql-types";

type CityFromQuery = NonNullable<GetOneCityQuery["getCityById"]>;

type CityProps = {
    city: CityFromQuery;
};

export default function CommentsAndRatings({ city }: CityProps) {

    return (
        <>
            <div className="comments__stars">
                <StarBar /><StarBar /><StarBar /><StarBar /><StarBar />
            </div>
          <Comment city={city} />
        </>
    )
}