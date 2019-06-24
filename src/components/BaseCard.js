import React from "react";
import { Card, CardActionArea } from "@material-ui/core";

function BaseCard({ hasActionArea, children, ...rest }) {
  return (
    <Card elevation={0} {...rest}>
      {hasActionArea ? <CardActionArea>{children}</CardActionArea> : children}
    </Card>
  );
}

export default BaseCard;
