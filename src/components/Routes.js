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
      <Route exact path="/search/:searchType" component={SearchResults} />
      <Route exact path="/movie/popular" component={PopularMovies} />
      <Route path="/movie/:movieId" component={MovieProfile} />
      <Route exact path="/person/popular" component={PopularPeople} />
      <Route path="/person/:personId" component={PersonProfile} />

      <Route path="*" render={() => <Redirect to="/movie/popular" />} />
    </SwitchWithScrollRestoration>
  );
}

export default Routes;
