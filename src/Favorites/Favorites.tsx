import { useContext } from "react";
import { FavoriteGifs } from "../Hooks/useFavorites";
import { StyledMainContent, GifDetails, Gifs, P } from "../components";

const gifDetailsToShow: GifDetails = [
    { title: "ID", value: "id" },
    { title: "User who uploaded", value: "username" },
    { title: "Imported on", value: "import_datetime" },
    { title: "Rating", value: "rating" },
    { title: "Source", value: "source" },
];

const NoFavoritedGifsYet = () => (
    <P>
        You don't have any favorites yet! Search for some gifs and find some you
        like!
    </P>
);

export const Favorites = () => {
    const { gifs } = useContext(FavoriteGifs);

    return (
        <StyledMainContent>
            {gifs?.length > 0 ? (
                <Gifs gifs={gifs} gifDetailsToShow={gifDetailsToShow} />
            ) : (
                <NoFavoritedGifsYet />
            )}
        </StyledMainContent>
    );
};

export default Favorites;
