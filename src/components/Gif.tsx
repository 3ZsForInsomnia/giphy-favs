import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import { Gif as IGif } from '../ApiServices';
import { useFavoriteGif } from "../Hooks/useFavorites";
import { StyledCard, TextSecondary } from './';

type GifDetail = { title: string; value: keyof IGif };
export type GifDetails = GifDetail[];

/**
 * Gif and Gifs are similar enough in use case to justify considering them tightly inter-related,
 * and Gifs largely exists to render a Gif array.
 *
 * Gif itself is exported separately from Gifs since it can realistically be used on its own,
 * for example, for a Gif Defail page.
 *
 * Lastly, we pass in the "detailsToShow" since currently we are want to show the same view for gifs in
 * general and when favorited, since cards are a great way to display a search result with varying levels
 * of additional information, but want to display _more_ information in the `favorited` view. As such,
 * we parameterize the part that can change and reuse what we can.
 */
export const Gif = ({
    gif,
    detailsToShow
}: {
    gif: IGif;
    detailsToShow: GifDetails;
}) => {
    const [isFavorited, toggleFavoritedStatus] = useFavoriteGif(gif);

    return (
        <StyledCard sx={{ maxWidth: 500, minWidth: 500 }} variant="outlined">
            <CardHeader tabIndex="0" title={gif.title} />
            <CardContent>
                <section>
                    {detailsToShow.map((detail: GifDetail) => (
                        <TextSecondary
                            key={detail.title}
                            title={detail.title}
                            value={"" + gif[detail.value]}
                        />
                    ))}
                </section>
                <CardMedia
                    component="img"
                    height="400"
                    image={gif.images.fixed_width_small.url}
                    alt={gif.title}
                />
            </CardContent>
            <CardActions disableSpacing>
                <IconButton
                    aria-label="add to favorites"
                    onClick={toggleFavoritedStatus}
                >
                    <FavoriteIcon sx={{ color: isFavorited ? red[500] : "" }} />
                </IconButton>
            </CardActions>
        </StyledCard>
    );
};

export const Gifs = ({ gifs, gifDetailsToShow }: { gifs: IGif[], gifDetailsToShow: GifDetails }) => (
    <>
        {gifs.map(currentGif => (
            <Gif key={currentGif.id} gif={currentGif} detailsToShow={gifDetailsToShow} />
        ))}
    </>
);

