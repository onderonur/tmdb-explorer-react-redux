import React from "react";
import { CircularProgress, Avatar, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  value: {
    ...theme.typography.button
  }
}));

function Rating({ value }) {
  const classes = useStyles();

  return (
    <Avatar
      style={{
        width: 46,
        height: 46,
        backgroundColor: "rgba(255, 255, 255, 0.8)"
      }}
    >
      <CircularProgress
        style={{ position: "absolute" }}
        variant="static"
        value={value}
        color="primary"
        thickness={4}
      />
      <span className={classes.value}>
        {value}
        <sup style={{ fontSize: "50%" }}>%</sup>
      </span>
    </Avatar>
  );
}

export default Rating;
