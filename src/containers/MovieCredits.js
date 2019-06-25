import React, { useEffect } from "react";
import { fetchMovieCredits } from "actions";
import { useDispatch, useSelector } from "react-redux";
import { selectMovieCreditsByMovieId } from "reducers";
import ColGridList from "components/ColGridList";
import MovieCastListItem from "./MovieCastListItem";

function MovieCredits({ movieId }) {
  const dispatch = useDispatch();
  const movieCredits = useSelector(state =>
    selectMovieCreditsByMovieId(state, movieId)
  );
  const castCreditIds = movieCredits ? movieCredits.cast : [];

  useEffect(() => {
    dispatch(fetchMovieCredits(movieId));
  }, [movieId, dispatch]);

  return (
    <ColGridList
      items={castCreditIds}
      spacing={1}
      renderItem={castCreditId => (
        <MovieCastListItem key={castCreditId} castCreditId={castCreditId} />
      )}
    />
  );
}

export default MovieCredits;
