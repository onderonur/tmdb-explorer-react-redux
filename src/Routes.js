import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PopularMovies from "containers/PopularMovies";
import MovieProfile from "containers/MovieProfile";
import PersonProfile from "containers/PersonProfile";
import PopularPeople from "containers/PopularPeople";
import MovieSearchResults from "containers/MovieSearchResults";

function Routes() {
  return (
    <Switch>
      <Route exact path="/movie/popular" component={PopularMovies} />
      <Route exact path="/movie/search" component={MovieSearchResults} />
      <Route path="/movie/:movieId" component={MovieProfile} />
      <Route exact path="/person/popular" component={PopularPeople} />
      <Route path="/person/:personId" component={PersonProfile} />

      <Route path="*" render={() => <Redirect to="/movie/popular" />} />
    </Switch>
  );
}

export default Routes;
