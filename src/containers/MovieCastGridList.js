import React, { useEffect } from "react";
import { fetchMovieCredits } from "actions";
import { useDispatch, useSelector } from "react-redux";
import { selectMovieCredits } from "reducers";
import MovieCastGridListItem from "./MovieCastGridListItem";
import FlexGridList from "components/FlexGridList";

function MovieCastGridList({ movieId }) {
  const dispatch = useDispatch();
  const movieCredits = useSelector(state => selectMovieCredits(state, movieId));
  const castCreditIds = movieCredits ? movieCredits.cast : [];

  useEffect(() => {
    dispatch(fetchMovieCredits(movieId));
  }, [movieId, dispatch]);

  return (
    <FlexGridList
      items={castCreditIds}
      minItemWidth={230}
      renderItem={castCreditId => (
        <MovieCastGridListItem key={castCreditId} castCreditId={castCreditId} />
      )}
    />
  );
}

export default MovieCastGridList;
