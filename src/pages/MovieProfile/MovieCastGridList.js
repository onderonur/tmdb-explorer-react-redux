import React, { useEffect } from "react";
import { fetchMovieCredits } from "actions";
import { useDispatch, useSelector } from "react-redux";
import { selectors } from "reducers";
import BaseGridList from "components/BaseGridList";
import MovieCastGridListItem from "./MovieCastGridListItem";

function renderItem(castCreditId) {
  return <MovieCastGridListItem castCreditId={castCreditId} button />;
}

function MovieCastGridList({ movieId }) {
  const dispatch = useDispatch();
  const movieCredits = useSelector(state =>
    selectors.selectMovieCredits(state, movieId)
  );
  const castCreditIds = movieCredits?.cast || [];
  const isFetchingCredits = useSelector(state =>
    selectors.selectIsFetchingMovieCredits(state, movieId)
  );

  useEffect(() => {
    dispatch(fetchMovieCredits(movieId));
  }, [movieId, dispatch]);

  return (
    <BaseGridList
      items={castCreditIds}
      loading={isFetchingCredits}
      minItemWidth={230}
      renderItem={renderItem}
      listEmptyMessage="No cast has been found"
    />
  );
}

export default MovieCastGridList;
