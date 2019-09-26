import React from "react";
import { Route, Redirect } from "react-router-dom";
import PopularMovies from "pages/PopularMovies";
import MovieProfile from "pages/MovieProfile";
import PersonProfile from "pages/PersonProfile";
import PopularPeople from "pages/PopularPeople";
import SearchResults from "pages/SearchResults";
import SwitchWithScrollRestoration from "components/SwitchWithScrollRestoration";

function Routes() {
  return (
    <SwitchWithScrollRestoration>
      <Route exact path="/search/:searchType">
        <SearchResults />
      </Route>
      <Route exact path="/movie/popular">
        <PopularMovies />
      </Route>
      <Route path="/movie/:movieId">
        <MovieProfile />
      </Route>
      <Route exact path="/person/popular">
        <PopularPeople />
      </Route>
      <Route path="/person/:personId">
        <PersonProfile />
      </Route>

      <Route path="*">
        <Redirect to="/movie/popular" />
      </Route>
    </SwitchWithScrollRestoration>
  );
}

export default Routes;
