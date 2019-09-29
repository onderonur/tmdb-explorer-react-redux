import React from "react";
import LoadingIndicator from "components/LoadingIndicator";
import { makeStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";

const DEFAULT_ITEMS = [];

function defaultKeyExtractor(id) {
  return id;
}

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
  items = DEFAULT_ITEMS,
  loading,
  renderItem,
  spacing = 1,
  minItemWidth = 220,
  keyExtractor = defaultKeyExtractor,
  listEmptyMessage = "Nothing has been found"
}) {
  const classes = useStyles({ minItemWidth, spacing });

  function extractItemKey(item, index) {
    return typeof keyExtractor === "string"
      ? item[keyExtractor]
      : keyExtractor(item, index);
  }

  return !items.length && !loading ? (
    typeof listEmptyMessage === "string" ? (
      <Typography>{listEmptyMessage}</Typography>
    ) : (
      listEmptyMessage
    )
  ) : (
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
