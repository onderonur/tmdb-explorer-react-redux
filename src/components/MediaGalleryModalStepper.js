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
    position: "absolute",
    top: "50%",
    width: 60,
    height: 60,
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
  activeStepIndex
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
          className={classes.stepper}
          left={0}
          justifyContent="flex-start"
          onClick={() =>
            historyPush(previousPath, {
              keepScrollState: true
            })
          }
        >
          <ChevronLeftIcon className={classes.stepperIcon} />
        </Box>
      )}
      {nextPath && (
        <Box
          className={classes.stepper}
          right={0}
          justifyContent="flex-end"
          onClick={() =>
            historyPush(nextPath, {
              keepScrollState: true
            })
          }
        >
          <ChevronRightIcon className={classes.stepperIcon} />
        </Box>
      )}
    </HotKeys>
  );
}

export default MediaGalleryModalStepper;
