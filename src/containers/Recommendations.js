import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecommendations } from "actions";
import MovieCard from "./MovieCard";
import GridList from "components/GridList";
import { selectors } from "reducers";
import { useTheme } from "@material-ui/styles";

function renderItem(recommendationId) {
  return (
    <li>
      <MovieCard movieId={recommendationId} />
    </li>
  );
}

function Recommendations({ movieId }) {
  const recommendationIds = useSelector(
    state => selectors.selectMovieRecommendations(state, movieId) || []
  );
  const isFetching = useSelector(state =>
    selectors.selectIsFetchingMovieRecommendations(state, movieId)
  );
  const theme = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecommendations(movieId));
  }, [movieId, dispatch]);

  return (
    <GridList
      items={recommendationIds}
      loading={isFetching}
      renderItem={renderItem}
      minItemWidth={260 / 2 - theme.spacing(2)}
      listEmptyMessage="No recommendation has been found"
    />
  );
}

export default Recommendations;
