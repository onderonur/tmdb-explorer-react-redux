import React from "react";
import LoadingIndicator from "components/LoadingIndicator";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";

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

  const isInitialFetch = loading && !items;

  return (
    <LoadingIndicator loading={isInitialFetch}>
      <Grid container spacing={2}>
        {items.map((item, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2}
            key={extractItemKey(item, index)}
          >
            {renderItem(item, index)}
          </Grid>
        ))}
      </Grid>
      <LoadingIndicator loading={loading} />
    </LoadingIndicator>
  );
}

export default GridList;
