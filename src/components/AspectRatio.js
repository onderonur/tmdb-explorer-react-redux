import React from "react";
import { Box } from "@material-ui/core";

const AspectRatio = React.forwardRef(({ aspectRatio, children }, ref) => {
  const [ratioX, ratioY] = aspectRatio.split(":");
  const paddingTop = `${(100 * ratioY) / ratioX}%`;

  return (
    <Box
      ref={ref}
      position="relative"
      height={0}
      paddingTop={paddingTop}
      overflow="hidden"
    >
      {children}
    </Box>
  );
});

export default AspectRatio;
