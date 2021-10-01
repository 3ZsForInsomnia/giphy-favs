import { giphyUrl, apiKey, getData } from './GiphyApi';

export const formatSearchString = (searchTerms: string) =>
    searchTerms.split(" ").join("+");

export const createSearchUrl = (searchedString: string) =>
    `${giphyUrl}search?${apiKey}&q=${formatSearchString(searchedString)}`;

export async function makeSearchAPICall(searchTerm: string) {
    const searchUrl = createSearchUrl(searchTerm);
    const response = await getData(fetch(searchUrl));
    return response.data;
}
