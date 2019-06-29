import React from "react";
import { Box } from "@material-ui/core";
import LoadingIndicator from "components/LoadingIndicator";

function FlexGridList({
  items = [],
  loading = false,
  renderItem,
  spacing = 1,
  minItemWidth = 250
}) {
  return (
    <LoadingIndicator loading={loading && !items}>
      <Box display="flex" flexWrap="wrap" margin={-spacing / 2}>
        {items.map((item, index) => (
          <Box
            key={index}
            flex={1}
            flexBasis={minItemWidth}
            minWidth={minItemWidth}
            padding={spacing / 2}
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
