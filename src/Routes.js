import React from "react";
import { Route, Redirect } from "react-router-dom";
import PopularMovies from "containers/PopularMovies";
import MovieProfile from "containers/MovieProfile";
import PersonProfile from "containers/PersonProfile";
import PopularPeople from "containers/PopularPeople";
import SearchResults from "containers/SearchResults";
import SwitchWithScrollToTop from "components/SwitchWithScrollToTop";

function Routes() {
  return (
    <SwitchWithScrollToTop>
      <Route exact path="/search/:searchType" component={SearchResults} />
      <Route exact path="/movie/popular" component={PopularMovies} />
      <Route path="/movie/:movieId" component={MovieProfile} />
      <Route exact path="/person/popular" component={PopularPeople} />
      <Route path="/person/:personId" component={PersonProfile} />

      {/* <Route path="*" render={() => <Redirect to="/movie/popular" />} /> */}
    </SwitchWithScrollToTop>
  );
}

export default Routes;
