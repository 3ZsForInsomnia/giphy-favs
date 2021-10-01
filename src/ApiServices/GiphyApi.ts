export const apiKey = "api_key=GZKGwdu6xlIM0iV58yFKJOFLqj0NLXFw";
export const giphyUrl = "https://api.giphy.com/v1/gifs/";

export interface Image {
    height: string;
    size: string;
    url: string;
    width: string;
}

export interface Gif {
    id: string;
    url: string;
    rating: string;
    images: { [key: string]: Image };
    username: string;
    title: string;
    source: string;
    import_datetime: string;
    embed_url: string;
}

export interface APIResponse {
    data: Gif[];
}

export async function getData(apiCall: Promise<Response>) {
    const response = await apiCall;
    const data = await response.json();
    return await data;
}
