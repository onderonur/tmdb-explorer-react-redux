import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieImages } from "actions";
import { selectMovieBackdrops, selectIsFetchingMovieImages } from "reducers";
import GridList from "components/GridList";
import MovieImageGridListItem from "./MovieImageGridListItem";
import MovieImageModal from "./MovieImageModal";

function renderItem(backdropId) {
  return (
    <li>
      <MovieImageGridListItem backdropId={backdropId} />
    </li>
  );
}

function MovieImageGridList({ movieId }) {
  const dispatch = useDispatch();
  const backdropIds = useSelector(state =>
    selectMovieBackdrops(state, movieId)
  );
  const isFetching = useSelector(state =>
    selectIsFetchingMovieImages(state, movieId)
  );

  useEffect(() => {
    dispatch(fetchMovieImages(movieId));
  }, [dispatch, movieId]);

  return (
    <>
      <GridList
        items={backdropIds}
        loading={isFetching}
        minItemWidth={120}
        renderItem={renderItem}
        listEmptyMessage="No image has been found."
      />
      <MovieImageModal movieId={movieId} />
    </>
  );
}

export default MovieImageGridList;
