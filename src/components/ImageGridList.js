import React from "react";
import GridList from "./GridList";
import ImageGridListItem from "./ImageGridListItem";

function renderItem(filePath) {
  return <ImageGridListItem filePath={filePath} />;
}

function ImageGridList({ filePaths, isFetching }) {
  return (
    <GridList
      items={filePaths}
      loading={isFetching}
      minItemWidth={120}
      renderItem={renderItem}
      listEmptyMessage="No image has been found."
    />
  );
}

export default ImageGridList;
