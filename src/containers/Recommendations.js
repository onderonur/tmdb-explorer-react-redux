import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecommendations } from "actions";
import MovieCard from "./MovieCard";
import GridList from "components/GridList";
import {
  selectMovieRecommendations,
  selectIsFetchingMovieRecommendations
} from "reducers";

function renderItem(recommendationId) {
  return <MovieCard movieId={recommendationId} />;
}

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
      renderItem={renderItem}
      listEmptyMessage="No recommendation has been found"
    />
  );
}

export default Recommendations;
