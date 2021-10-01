import { useState } from "react";
import {
    BrowserRouter as Router,
    Redirect,
    Switch,
    Route
} from "react-router-dom";
import { Gif } from "../ApiServices";
import { StyledAppContainer, Navbar, NavItem } from "../components";
import Search from "../Search/Search";
import Favorites from "../Favorites/Favorites";
import { FavoriteGifs } from "../Hooks/useFavorites";

const routes: NavItem[] = [
    { url: "/search", text: "Search for a gif" },
    { url: "/favorites", text: "See your Favorites" }
];

const App = () => {
    const [favoritedGifs, setFavoritedGifs] = useState<Gif[]>([]);

    return (
        <FavoriteGifs.Provider
            value={{
                gifs: favoritedGifs,
                updateFavoritedGifs: setFavoritedGifs
            }}
        >
            <Router>
                <StyledAppContainer className="wtf">
                    <Navbar navItems={routes} />
                    <Switch>
                        <Route path="/search">
                            <Search />
                        </Route>
                        <Route path="/favorites">
                            <Favorites />
                        </Route>
                        <Redirect from="/" to="search" />
                    </Switch>
                </StyledAppContainer>
            </Router>
        </FavoriteGifs.Provider>
    );
};

export default App;
