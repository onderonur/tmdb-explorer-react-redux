import React, { useEffect } from "react";
import { fetchMovieCredits } from "actions";
import { useDispatch, useSelector } from "react-redux";
import { selectMovieCreditsByMovieId } from "reducers/entities";
import ColGridList from "components/ColGridList";
import MovieCastListItem from "./MovieCastListItem";
import LoadingIndicator from "components/LoadingIndicator";
import { selectMovieCreditsIsFetching } from "reducers/isFetching";

function MovieCredits({ movieId }) {
  const dispatch = useDispatch();
  const movieCredits = useSelector(state =>
    selectMovieCreditsByMovieId(state, movieId)
  );
  const castCreditIds = movieCredits ? movieCredits.cast : [];
  const isFetching = useSelector(state =>
    selectMovieCreditsIsFetching(state, movieId)
  );

  useEffect(() => {
    dispatch(fetchMovieCredits(movieId));
  }, [movieId, dispatch]);

  return isFetching ? (
    <LoadingIndicator />
  ) : (
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
