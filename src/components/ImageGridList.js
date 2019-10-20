import React from "react";
import GridList from "./GridList";
import ImageGridListItem from "./ImageGridListItem";

function ImageGridList({ filePaths, isFetching, imageAspectRatio }) {
  function renderItem(filePath) {
    return (
      <ImageGridListItem filePath={filePath} aspectRatio={imageAspectRatio} />
    );
  }

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
