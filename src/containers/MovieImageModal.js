import React from "react";
import { useSelector } from "react-redux";
import { selectBackdrop, selectMovieBackdrops, selectMovie } from "reducers";
import MediaGalleryModal from "components/MediaGalleryModal";

function MovieImageModal({ movieId }) {
  const movie = useSelector(state => selectMovie(state, movieId));

  const movieImageIds =
    useSelector(state => selectMovieBackdrops(state, movieId)) || [];
  const movieImages = useSelector(state =>
    movieImageIds.map(movieImageId => selectBackdrop(state, movieImageId))
  );
  const filePaths = movieImages.map(movieImage => movieImage.file_path);

  return (
    <MediaGalleryModal
      title={movie ? movie.title : ""}
      dataSource={filePaths}
      queryParamName="view"
    />
  );
}

export default MovieImageModal;
