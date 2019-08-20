import React from "react";
import LoadingIndicator from "components/LoadingIndicator";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  flexList: {
    listStyle: "none",
    padding: 0,
    display: "grid",
    gridGap: ({ spacing }) => theme.spacing(spacing),
    gridTemplateColumns: ({ minItemWidth }) =>
      `repeat(auto-fill, minmax(${minItemWidth}px, 1fr))`
  }
}));

function GridList({
  items = [],
  loading,
  renderItem,
  spacing = 1,
  minItemWidth = 220,
  keyExtractor
}) {
  const classes = useStyles({ minItemWidth, spacing });

  function extractItemKey(item, index) {
    return typeof keyExtractor === "string"
      ? item[keyExtractor]
      : keyExtractor(item, index);
  }

  return (
    <React.Fragment>
      <ul className={classes.flexList}>
        {items.map((item, index) => (
          <li key={extractItemKey(item, index)}>{renderItem(item, index)}</li>
        ))}
      </ul>
      <LoadingIndicator loading={loading} />
    </React.Fragment>
  );
}

export default GridList;
