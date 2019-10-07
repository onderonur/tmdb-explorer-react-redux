import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectBackdrop, selectMovieBackdrops, selectMovie } from "reducers";
import { useLocation } from "react-router-dom";
import useQueryString from "hooks/useQueryString";
import PaginatedModal from "components/PaginatedModal";
import BaseImage from "components/BaseImage";
import { getImageUrl } from "utils";
import FullScreen from "react-full-screen";
import { Box, Typography, IconButton } from "@material-ui/core";
import FullscreenIcon from "@material-ui/icons/Fullscreen";

function MovieImageModal({ movieId }) {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const movie = useSelector(state => selectMovie(state, movieId));
  const location = useLocation();
  const { view } = useQueryString();
  const imageToView = useSelector(state => selectBackdrop(state, view));

  const movieImageIds =
    useSelector(state => selectMovieBackdrops(state, movieId)) || [];

  const imageCount = movieImageIds.length;
  const orderOfImageToView = movieImageIds.indexOf(view);
  const isFirstImage = orderOfImageToView === 0;
  const isLastImage = orderOfImageToView >= imageCount - 1;
  const previousImageIdToView = !isFirstImage
    ? movieImageIds[orderOfImageToView - 1]
    : null;
  const nextImageIdToView = !isLastImage
    ? movieImageIds[orderOfImageToView + 1]
    : null;

  return (
    <PaginatedModal
      title={
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          width="100%"
        >
          <Box flex={1}>
            <Typography variant="h6" noWrap>
              {movie ? movie.title : ""}
            </Typography>
          </Box>
          <IconButton onClick={() => setIsFullScreen(true)}>
            <FullscreenIcon />
          </IconButton>
        </Box>
      }
      isOpen={!!imageToView}
      steps={imageCount}
      activeStep={orderOfImageToView}
      nextPath={
        nextImageIdToView
          ? `${location.pathname}?view=${nextImageIdToView}`
          : null
      }
      previousPath={
        previousImageIdToView
          ? `${location.pathname}?view=${previousImageIdToView}`
          : null
      }
      returnPath={location.pathname}
    >
      <FullScreen
        enabled={isFullScreen}
        onChange={enabled => setIsFullScreen(enabled)}
      >
        <BaseImage
          // Added this key to recreate the component when the "file_path" changes.
          // Without this, when user clicks the "next" or "previous" button, it wait image to load to rerender.
          key={imageToView ? imageToView.file_path : "0"}
          src={
            imageToView
              ? getImageUrl(imageToView.file_path, { original: true })
              : null
          }
          lazyLoad={false}
          aspectRatio="16:9"
        />
      </FullScreen>
    </PaginatedModal>
  );
}

export default MovieImageModal;
