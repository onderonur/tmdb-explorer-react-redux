import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import useHistoryPush from "hooks/useHistoryPush";
import { HotKeys } from "react-hotkeys";
import { useLocation } from "react-router-dom";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const keyMap = {
  NEXT: ["right", "d"],
  PREVIOUS: ["left", "a"]
};

const useStyles = makeStyles(theme => ({
  stepper: {
    cursor: "pointer",
    opacity: 0.4,
    "&:hover": {
      opacity: 0.7
    }
  },
  stepperIcon: {
    fontSize: theme.typography.h2.fontSize
  }
}));

function MediaGalleryModalStepper({
  dataSource = [],
  queryParamName,
  activeStepIndex,
  isVideoPlayer
}) {
  const classes = useStyles();
  const location = useLocation();
  const historyPush = useHistoryPush();

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
      {previousPath && (
        <Box
          position="absolute"
          top={isVideoPlayer ? "30%" : 0}
          bottom={isVideoPlayer ? "30%" : 0}
          left={0}
          width="20%"
          onClick={() =>
            historyPush(previousPath, {
              keepScrollState: true
            })
          }
          className={classes.stepper}
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
        >
          <ChevronLeftIcon className={classes.stepperIcon} />
        </Box>
      )}
      {nextPath && (
        <Box
          position="absolute"
          top={isVideoPlayer ? "30%" : 0}
          bottom={isVideoPlayer ? "30%" : 0}
          right={0}
          width="20%"
          onClick={() =>
            historyPush(nextPath, {
              keepScrollState: true
            })
          }
          className={classes.stepper}
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
        >
          <ChevronRightIcon className={classes.stepperIcon} />
        </Box>
      )}
    </HotKeys>
  );
}

export default MediaGalleryModalStepper;
