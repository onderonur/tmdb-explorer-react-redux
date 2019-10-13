import React, { useEffect } from "react";
import { fetchMovieCredits } from "actions";
import { useDispatch, useSelector } from "react-redux";
import { selectors } from "reducers";
import MovieCastGridListItem from "./MovieCastGridListItem";
import GridList from "components/GridList";

function renderItem(castCreditId) {
  return <MovieCastGridListItem castCreditId={castCreditId} button />;
}

function MovieCastGridList({ movieId }) {
  const dispatch = useDispatch();
  const movieCredits = useSelector(state =>
    selectors.selectMovieCredits(state, movieId)
  );
  const castCreditIds = movieCredits ? movieCredits.cast : [];
  const isFetchingCredits = useSelector(state =>
    selectors.selectIsFetchingMovieCredits(state, movieId)
  );

  useEffect(() => {
    dispatch(fetchMovieCredits(movieId));
  }, [movieId, dispatch]);

  return (
    <GridList
      items={castCreditIds}
      loading={isFetchingCredits}
      minItemWidth={230}
      renderItem={renderItem}
      listEmptyMessage="No cast has been found"
    />
  );
}

export default MovieCastGridList;
