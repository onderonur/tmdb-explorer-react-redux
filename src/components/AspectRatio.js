import React from "react";
import { makeStyles } from "@material-ui/core";

export const getAspectRatioString = (width, height) => `${width}:${height}`;

const useStyles = makeStyles(theme => ({
  root: {
    overflow: "hidden",
    position: "relative",
    height: ({ paddingTop }) => (paddingTop ? 0 : undefined),
    paddingTop: ({ paddingTop }) => paddingTop
  }
}));

const AspectRatio = ({ aspectRatio, children }, ref) => {
  const [ratioX, ratioY] = aspectRatio.split(":").map(ratio => parseInt(ratio));
  const ratio = (100 * ratioY) / ratioX;
  const paddingTop = isNaN(ratio) ? undefined : `${ratio}%`;

  const classes = useStyles({ paddingTop });

  return (
    <div ref={ref} className={classes.root}>
      {children}
    </div>
  );
};

export default React.forwardRef(AspectRatio);
