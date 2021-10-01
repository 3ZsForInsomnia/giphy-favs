import { renderHook, act } from "@testing-library/react-hooks";
import { useFavoriteGif, FavoriteGifs } from "./useFavorites";
import { Gif } from "../ApiServices/GiphyApi";

/**
 * Added some tests for the state managing "service" in the hook and context provider,
 * as this is the guts of the logic of the overall app. I would have also tested the UI
 * a fair bit more, but in the interest of time/keeping this to "what can Zach do within
 * a given timebox", I held back on that for now.
 *
 * I did make sure to use normal testing practices for hooks, i.e. to isolate the hook
 * as much as possible from its usage (i.e. components), and to test the following:
 * What happens when we favorite/unfavorite _one_ gif?
 * What happens when we favorite/unfavorite a gif when others have also been favorited?
 *
 * This guarantees that our state management does not accidentally erase the existing set
 * of favorited gifs when adding/removing one favorited item.
 *
 * If I had taken the time to write tests for the UI, it would have focused first around
 * interactions and their results, and in a more "integration" testing based manner, a la
 * Kent C. Dodds. In his style, I have still ensured the type definitions are consistently
 * restrictive to guarantee the TS compiler can help prevent as many bugs as possible even
 * before writing tests.
 */

/**
 * We are not rendering the gifs, so really only the ID matters to ensure favoriting and unfavoriting works
 */
const mockGif: Gif = {
    id: "1234",
    url: "",
    import_datetime: "",
    embed_url: "",
    rating: "",
    images: {},
    username: "",
    title: "",
    source: ""
};
const anotherMockGif: Gif = {
    id: "4321",
    url: "",
    import_datetime: "",
    embed_url: "",
    rating: "",
    images: {},
    username: "",
    title: "",
    source: ""
};

describe("useFavorites", () => {
    let gifs: Gif[] = [];
    let setFavoritedGifs = (newGifs: Gif[]) => (gifs = newGifs);
    let wrapper: any;

    beforeEach(() => {
        gifs = [];
        wrapper = ({ children }: any) => (
            <FavoriteGifs.Provider
                value={{
                    gifs,
                    updateFavoritedGifs: setFavoritedGifs
                }}
            >
                {children}
            </FavoriteGifs.Provider>
        );
    });

    it("should return isFavorite === true when an unfavorited gif is favorited", () => {
        const { result, rerender } = renderHook(() => useFavoriteGif(mockGif), {
            wrapper
        });

        act(() => {
            const [, toggleFavoritedStatusOfGif] = result.current;
            toggleFavoritedStatusOfGif();
        });

        rerender();
        const [isFavorite] = result.current;

        expect(isFavorite).toBe(true);
    });

    it("should return isFavorite === false when a favorited gif is unfavorited", () => {
        gifs = [mockGif];
        const { result, rerender } = renderHook(() => useFavoriteGif(mockGif), {
            wrapper
        });

        act(() => {
            const [, toggleFavoritedStatusOfGif] = result.current;
            toggleFavoritedStatusOfGif();
        });

        rerender();
        const [isFavorite] = result.current;

        expect(isFavorite).toBe(false);
    });

    it("should return isFavorite === true when a new gif is favorited", () => {
        gifs = [mockGif];
        const { result, rerender } = renderHook(
            () => useFavoriteGif(anotherMockGif),
            {
                wrapper
            }
        );

        act(() => {
            const [, toggleFavoritedStatusOfGif] = result.current;
            toggleFavoritedStatusOfGif();
        });

        rerender();
        const [isFavorite] = result.current;

        expect(isFavorite).toBe(true);
        expect(gifs.length).toBe(2);
    });

    it("should return isFavorite === false when a favorited gif is unfavorited, without removing any other gifs", () => {
        gifs = [mockGif, anotherMockGif];
        const { result, rerender } = renderHook(() => useFavoriteGif(mockGif), {
            wrapper
        });

        act(() => {
            const [, toggleFavoritedStatusOfGif] = result.current;
            toggleFavoritedStatusOfGif();
        });

        rerender();
        const [isFavorite] = result.current;

        expect(isFavorite).toBe(false);
        expect(gifs.length).toBe(1);
    });
});
