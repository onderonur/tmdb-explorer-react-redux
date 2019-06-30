import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import LoadingIndicator from "components/LoadingIndicator";
import { makeStyles } from "@material-ui/styles";
import useResizeObserver from "hooks/useResizeObserver";

const useStyles = makeStyles(theme => ({
  flexList: {
    listStyle: "none",
    padding: 0
  }
}));

function FlexGridList({
  items = [],
  loading,
  renderItem,
  spacing = 1,
  itemWrapWidth = 250,
  keyExtractor
}) {
  const classes = useStyles();
  const [resizeObserverRef, { width }] = useResizeObserver();
  const [itemsPerRow, setItemsPerRow] = useState(1);

  useEffect(() => {
    if (width) {
      const itemsPerRow = Math.floor(width / itemWrapWidth) || 1;
      setItemsPerRow(itemsPerRow);
    }
  }, [width, itemWrapWidth]);

  function extractItemKey(item, index) {
    return typeof keyExtractor === "string"
      ? item[keyExtractor]
      : keyExtractor(item, index);
  }

  const flexBasis = `${100 / itemsPerRow}%`;
  const halfOfSpacing = spacing / 2;
  const isInitialFetch = loading && !items;

  return (
    <LoadingIndicator loading={isInitialFetch}>
      <Box
        ref={resizeObserverRef}
        display="flex"
        flexWrap="wrap"
        margin={-halfOfSpacing}
        component="ul"
        className={classes.flexList}
      >
        {items.map((item, index) => (
          <Box
            key={extractItemKey(item, index)}
            flexBasis={flexBasis}
            minWidth={flexBasis}
            padding={halfOfSpacing}
            component="li"
          >
            {renderItem(item, index)}
          </Box>
        ))}
      </Box>
      <LoadingIndicator loading={loading} />
    </LoadingIndicator>
  );
}

export default FlexGridList;
