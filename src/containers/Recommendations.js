import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecommendations } from "actions";
import MovieCard from "./MovieCard";
import GridList from "components/GridList";
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
    <GridList
      items={recommendationIds}
      loading={isFetching}
      keyExtractor={recommendationId => recommendationId}
      renderItem={recommendationId => <MovieCard movieId={recommendationId} />}
    />
  );
}

export default Recommendations;
