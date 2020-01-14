import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieImages } from "actions";
import { selectors } from "reducers";
import ImageGridList from "components/ImageGridList";
import ImageGalleryModal from "components/ImageGalleryModal";
import { getAspectRatioString } from "components/AspectRatio";

function MovieImageGridList({ movieId }) {
  const dispatch = useDispatch();
  const movie = useSelector(state => selectors.selectMovie(state, movieId));
  const filePaths = useSelector(state =>
    selectors.selectMovieImages(state, movieId)
  );
  const isFetching = useSelector(state =>
    selectors.selectIsFetchingMovieImages(state, movieId)
  );

  useEffect(() => {
    dispatch(fetchMovieImages(movieId));
  }, [dispatch, movieId]);

  return (
    <>
      <ImageGridList
        filePaths={filePaths}
        isFetching={isFetching}
        aspectRatio={getAspectRatioString(16, 9)}
      />
      <ImageGalleryModal title={movie?.title} filePaths={filePaths} />
    </>
  );
}

export default MovieImageGridList;
