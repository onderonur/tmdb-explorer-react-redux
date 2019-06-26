import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecommendations } from "actions";
import MovieCard from "./MovieCard";
import FlexGridList from "components/FlexGridList";
import {
  selectMovieRecommendations,
  selectIsFetchingMovieRecommendations
} from "reducers";

function Recommendations({ movieId }) {
  const recommendationIds = useSelector(
    state => selectMovieRecommendations(state, movieId) || []
  );
  const isFetching = useSelector(state =>
    selectIsFetchingMovieRecommendations(state, movieId)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecommendations(movieId));
  }, [movieId, dispatch]);

  return (
    <FlexGridList
      items={recommendationIds}
      loading={isFetching}
      minItemWidth={250}
      spacing={1}
      renderItem={movieId => <MovieCard movieId={movieId} />}
    />
  );
}

export default Recommendations;
