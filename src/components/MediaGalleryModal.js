import React, { useState, useEffect } from "react";
import {
  MobileStepper,
  Button,
  Box,
  Typography,
  IconButton
} from "@material-ui/core";
import BaseDialog from "components/BaseDialog";
import { useTheme } from "@material-ui/styles";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import useHistoryPush from "hooks/useHistoryPush";
import { HotKeys } from "react-hotkeys";
import useQueryString from "hooks/useQueryString";
import { useLocation } from "react-router-dom";
import BaseImage from "./BaseImage";
import { getImageUrl } from "utils";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullScreen from "react-full-screen";
import YouTubePlayer from "./YouTubePlayer";

const keyMap = {
  NEXT: ["right", "d"],
  PREVIOUS: ["left", "a"]
};

function MediaGalleryModal({
  title,
  dataSource = [],
  queryParamName,
  isVideoPlayer = false
}) {
  const theme = useTheme();
  const location = useLocation();
  const historyPush = useHistoryPush();

  const activeStep = useQueryString()[queryParamName];
  const activeStepIndex = dataSource.indexOf(activeStep);

  const [isVisible, setIsVisible] = useState(false);

  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    if (typeof activeStepIndex === "number") {
      setIsVisible(activeStepIndex >= 0);
    } else {
      setIsVisible(false);
    }
  }, [activeStepIndex]);

  function handleClose() {
    setIsVisible(false);
  }

  function handleExited() {
    historyPush(location.pathname, { keepScrollState: true });
  }

  const nextPath =
    activeStepIndex + 1 !== dataSource.length
      ? `${location.pathname}?${queryParamName}=${
          dataSource[activeStepIndex + 1]
        }`
      : null;
  const previousPath =
    activeStepIndex - 1 !== -1
      ? `${location.pathname}?${queryParamName}=${
          dataSource[activeStepIndex - 1]
        }`
      : null;

  const keyHandlers = {
    NEXT: () => historyPush(nextPath, { keepScrollState: true }),
    PREVIOUS: () => historyPush(previousPath, { keepScrollState: true })
  };

  return (
    <HotKeys keyMap={keyMap} handlers={keyHandlers} allowChanges={true}>
      <BaseDialog
        title={
          isVideoPlayer ? (
            title
          ) : (
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              width="100%"
            >
              <Box flex={1}>
                <Typography variant="h6" noWrap>
                  {title}
                </Typography>
              </Box>
              <IconButton onClick={() => setIsFullScreen(true)}>
                <FullscreenIcon />
              </IconButton>
            </Box>
          )
        }
        open={!!isVisible}
        onClose={handleClose}
        onExited={handleExited}
        zeroPaddingContent
      >
        {isVideoPlayer ? (
          <YouTubePlayer youTubeId={dataSource[activeStepIndex]} />
        ) : (
          <FullScreen
            enabled={isFullScreen}
            onChange={enabled => setIsFullScreen(enabled)}
          >
            <BaseImage
              // Added this key to recreate the component when the "file_path" changes.
              // Without this, when user clicks the "next" or "previous" button, it wait image to load to rerender.
              key={
                dataSource[activeStepIndex] ? dataSource[activeStepIndex] : "0"
              }
              src={
                dataSource[activeStepIndex]
                  ? getImageUrl(dataSource[activeStepIndex], {
                      original: true
                    })
                  : null
              }
              lazyLoad={false}
              aspectRatio="16:9"
            />
          </FullScreen>
        )}
        <MobileStepper
          steps={dataSource.length}
          position="static"
          variant="text"
          activeStep={activeStepIndex}
          nextButton={
            <Button
              size="small"
              disabled={!nextPath}
              onClick={() =>
                historyPush(nextPath, {
                  keepScrollState: true
                })
              }
            >
              Next
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              disabled={!previousPath}
              onClick={() =>
                historyPush(previousPath, {
                  keepScrollState: true
                })
              }
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
      </BaseDialog>
    </HotKeys>
  );
}

export default MediaGalleryModal;
