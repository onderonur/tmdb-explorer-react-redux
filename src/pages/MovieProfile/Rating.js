import React from "react";
import {
  CircularProgress,
  Avatar,
  makeStyles,
  colors
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  avatar: {
    width: 46,
    height: 46,
    backgroundColor: colors.common.white
  },
  value: theme.typography.button,
  percent: {
    fontSize: "50%"
  }
}));

function Rating({ value }) {
  const classes = useStyles();

  return (
    <Avatar className={classes.avatar}>
      <CircularProgress
        style={{ position: "absolute" }}
        variant="static"
        value={value}
        color="primary"
        thickness={4}
      />
      <span className={classes.value}>
        {value}
        <sup className={classes.percent}>%</sup>
      </span>
    </Avatar>
  );
}

export default Rating;
