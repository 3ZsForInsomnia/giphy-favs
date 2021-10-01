import { useState, KeyboardEvent } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import { Gif as IGif, makeSearchAPICall } from "../ApiServices";
import { StyledMainContent, GifDetails, Gifs, P } from "../components";

const gifDetailsToShow: GifDetails = [
    { title: "ID", value: "id" },
    { title: "Rating", value: "rating" }
];

const NoResults = () => <P>No results returned. Maybe try another search?</P>;
const NoSearchHasBeenMadeYet = () => <P>Ready when you are!</P>;

const StyledTextField = styled(TextField)`
    width: 50%;
`;
const StyledButton = styled(Button)`
    && {
        @media (min-width: 48rem) {
            margin: 0.5rem 3rem;
        }
    }
`;

export const Search = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [searchResults, setSearchResults] = useState<IGif[]>([]);
    const [hasSearched, setHasSearched] = useState(false);

    const search = () => {
        makeSearchAPICall(searchTerm).then(setSearchResults);
        setHasSearched(true);
    };

    const keyDownHandler = (event: KeyboardEvent) => {
        if (event.code === "Enter") search();
    };

    return (
        <>
            <StyledTextField
                variant="outlined"
                label="Search for gifs"
                onChange={event => setSearchTerm(event.target.value)}
                onKeyDown={keyDownHandler}
            />
            <StyledButton onClick={search}>Search for Gifs</StyledButton>
            <StyledMainContent>
                {searchResults?.length > 0 ? (
                    <Gifs
                        gifs={searchResults}
                        gifDetailsToShow={gifDetailsToShow}
                    />
                ) : hasSearched ? (
                    <NoResults />
                ) : (
                    <NoSearchHasBeenMadeYet />
                )}
            </StyledMainContent>
        </>
    );
};

export default Search;
