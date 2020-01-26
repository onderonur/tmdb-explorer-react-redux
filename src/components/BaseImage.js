import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import placeholderPng from "assets/placeholder.png";
import clsx from "clsx";
import { Box, useTheme } from "@material-ui/core";
import LoadingIndicator from "./LoadingIndicator";
import { useTrackVisibility } from "react-intersection-observer-hook";
import useAspectRatio, { getAspectRatioString } from "hooks/useAspectRatio";

const ORIGINAL = "original";
const DEFAULT_ALT = "Not Loaded";
const DEFAULT_ASPECT_RATIO = getAspectRatioString(1, 1);

const useStyles = makeStyles(theme => ({
  imgWrapper: {
    display: "block",
    backgroundColor: theme.palette.background.default
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: ({ objectFit }) => objectFit
  }
}));

function BaseImage({
  src,
  alt = DEFAULT_ALT,
  aspectRatio = ORIGINAL,
  lazyLoad = true,
  objectFit = "cover",
  showFallbackWhileLoading
}) {
  const classes = useStyles({ objectFit });
  const theme = useTheme();
  const [imgHeight, setImgHeight] = useState();
  const [imgWidth, setImgWidth] = useState();
  const [ref, { isVisible }] = useTrackVisibility();
  const [lazyLoaded, setLazyLoaded] = useState(isVisible);
  const [isImgLoaded, setIsImgLoaded] = useState(false);

  const isOriginalAspectRatio = aspectRatio === ORIGINAL;

  const aspectRatioClasses = useAspectRatio({
    aspectRatio: isOriginalAspectRatio
      ? imgWidth && imgHeight
        ? getAspectRatioString(imgWidth, imgHeight)
        : DEFAULT_ASPECT_RATIO
      : aspectRatio
  });

  function handleLoad(e) {
    if (isOriginalAspectRatio) {
      const img = e.target;
      setImgHeight(img.naturalHeight);
      setImgWidth(img.naturalWidth);
    }

    setIsImgLoaded(true);
  }

  useEffect(() => {
    if (isVisible) {
      setLazyLoaded(true);
    }
  }, [isVisible]);

  return (
    <div ref={lazyLoad ? ref : undefined} className={aspectRatioClasses.root}>
      {lazyLoad && !lazyLoaded ? null : (
        <>
          <Box className={clsx(classes.imgWrapper, aspectRatioClasses.child)}>
            <img
              className={classes.img}
              src={src || placeholderPng}
              alt={alt}
              onLoad={handleLoad}
            />
          </Box>
          {!isImgLoaded && showFallbackWhileLoading && (
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              display="flex"
              alignItems="center"
              bgcolor={theme.palette.grey[900]}
            >
              <LoadingIndicator loading />
            </Box>
          )}
        </>
      )}
    </div>
  );
}

export default BaseImage;
