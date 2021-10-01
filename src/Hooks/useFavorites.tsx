import { createContext, useContext } from "react";
import { Gif } from "../ApiServices";

/**
 * Simple state management setup.
 *
 * Context provider contains state and a function for updating that state,
 * and the hook provides a mechanism for interacting with that state on a
 * per-component basis.
 */
export const FavoriteGifs = createContext<{
    gifs: Gif[];
    updateFavoritedGifs: Function;
}>({ gifs: [], updateFavoritedGifs: Function });

export const useFavoriteGif = (gif: Gif): [boolean, () => void] => {
    const { gifs, updateFavoritedGifs } = useContext(FavoriteGifs);

    const findIndexOfGifById = (gifToSearchFor: Gif) => (currentGif: Gif) =>
        gifToSearchFor.id === currentGif.id;

    const isCurrentGifFavorited = gifs.some(findIndexOfGifById(gif));

    const filterOutGif = (idOfGifToUnfavorite: string) => (currentGif: Gif) =>
        currentGif.id !== idOfGifToUnfavorite;

    const toggleFavoritedStatusOfGif = () => {
        const newListOfFavoritedGifs = isCurrentGifFavorited
            ? gifs.filter(filterOutGif(gif.id))
            : [...gifs, gif];
        updateFavoritedGifs(newListOfFavoritedGifs);
    };

    return [isCurrentGifFavorited, toggleFavoritedStatusOfGif];
};
