import { makeStyles } from "@material-ui/core";

export const getAspectRatioString = (width, height) => `${width}:${height}`;

const useStyles = makeStyles(theme => ({
  root: {
    overflow: "hidden",
    position: "relative",
    height: ({ paddingTop }) => (paddingTop ? 0 : undefined),
    paddingTop: ({ paddingTop }) => paddingTop
  },
  child: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%"
  }
}));

function useAspectRatio({ aspectRatio }) {
  const [ratioX, ratioY] = aspectRatio.split(":").map(ratio => parseInt(ratio));
  const ratio = (100 * ratioY) / ratioX;
  const paddingTop = isNaN(ratio) ? undefined : `${ratio}%`;
  const classes = useStyles({ paddingTop });

  return classes;
}

export default useAspectRatio;
