import React from "react";
import { Card, CardActionArea } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  card: {
    backgroundColor: "transparent"
  }
}));

function BaseCard({ hasActionArea, className, children, ...rest }) {
  const classes = useStyles();

  return (
    <Card elevation={0} className={clsx(classes.card, className)} {...rest}>
      {hasActionArea ? <CardActionArea>{children}</CardActionArea> : children}
    </Card>
  );
}

export default BaseCard;
