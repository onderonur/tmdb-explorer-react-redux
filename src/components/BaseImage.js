import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import placeholderPng from "assets/placeholder.png";
import clsx from "clsx";
import AspectRatio from "components/AspectRatio";
import { Box, useTheme } from "@material-ui/core";
import LoadingIndicator from "./LoadingIndicator";
import { useTrackVisibility } from "react-intersection-observer-hook";

const ORIGINAL = "original";
const DEFAULT_ALT = "Not Loaded";

const useStyles = makeStyles(theme => ({
  imgWrapper: {
    display: "block",
    width: "100%",
    height: "100%",
    backgroundColor: theme.palette.background.default
  },
  imgWithAspectRatioWrapper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
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
  const [imgHeight, setImgHeight] = useState(0);
  const [imgWidth, setImgWidth] = useState(0);
  const [ref, { isVisible }] = useTrackVisibility();
  const [initialized, setInitialized] = useState(!lazyLoad);
  const [isImgLoaded, setIsImgLoaded] = useState(false);

  const isOriginalAspectRatio = aspectRatio === ORIGINAL;

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
      setInitialized(true);
    }
  }, [isVisible]);

  return (
    <AspectRatio
      ref={lazyLoad ? ref : undefined}
      aspectRatio={
        isOriginalAspectRatio ? `${imgWidth}:${imgHeight}` : aspectRatio
      }
    >
      {lazyLoad && !initialized ? null : (
        <>
          <Box
            className={clsx(
              classes.imgWrapper,
              classes.imgWithAspectRatioWrapper
            )}
          >
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
    </AspectRatio>
  );
}

export default BaseImage;
