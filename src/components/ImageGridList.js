import React from "react";
import BaseGridList from "./BaseGridList";
import ImageGridListItem from "./ImageGridListItem";

function ImageGridList({
  filePaths,
  isFetching,
  aspectRatio,
  minItemWidth = 120
}) {
  function renderItem(filePath) {
    return (
      <ImageGridListItem filePath={filePath} aspectRatio={aspectRatio} />
    );
  }

  return (
    <BaseGridList
      items={filePaths}
      loading={isFetching}
      minItemWidth={minItemWidth}
      renderItem={renderItem}
      listEmptyMessage="No image has been found."
    />
  );
}

export default ImageGridList;
