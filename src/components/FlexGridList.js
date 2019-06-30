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
  loading = false,
  renderItem,
  spacing = 1,
  itemWrapWidth = 250
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

  return (
    <LoadingIndicator loading={loading && !items}>
      <Box
        ref={resizeObserverRef}
        display="flex"
        flexWrap="wrap"
        margin={-spacing / 2}
        component="ul"
        className={classes.flexList}
      >
        {items.map((item, index) => (
          <Box
            // TODO: keyExtractor filan yap
            key={index}
            flex={1}
            flexBasis={`${100 / itemsPerRow}%`}
            minWidth={`${100 / itemsPerRow}%`}
            padding={spacing / 2}
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
