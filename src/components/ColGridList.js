import React from "react";
import { Box } from "@material-ui/core";
import LoadingIndicator from "components/LoadingIndicator";
import useWidth from "hooks/useWidth";
import { isWidthUp } from "@material-ui/core/withWidth";

function ColGridList({
  items = [],
  loading,
  renderItem,
  spacing = 1,
  colCount: { xs = 1, sm, md, lg, xl } = { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }
}) {
  const width = useWidth();

  function getColCount() {
    if (xl && isWidthUp("xl", width)) {
      return xl;
    }

    if (lg && isWidthUp("lg", width)) {
      return lg;
    }

    if (md && isWidthUp("md", width)) {
      return md;
    }

    if (sm && isWidthUp("sm", width)) {
      return sm;
    }

    return xs;
  }

  const flexBasis = `${100 / getColCount()}%`;

  return !items && loading ? (
    <LoadingIndicator />
  ) : items ? (
    <>
      <Box display="flex" flexWrap="wrap" margin={-spacing / 2}>
        {items.map((item, index) => (
          <Box
            key={index}
            flexBasis={flexBasis}
            minWidth={flexBasis}
            padding={spacing / 2}
          >
            {renderItem(item, index)}
          </Box>
        ))}
      </Box>
      {loading && <LoadingIndicator />}
    </>
  ) : null;
}

export default ColGridList;
