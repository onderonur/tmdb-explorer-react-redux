import React from "react";
import BaseGridList from "./BaseGridList";
import ImageGridListItem from "./ImageGridListItem";

function ImageGridList({ filePaths, isFetching, imageAspectRatio }) {
  function renderItem(filePath) {
    return (
      <ImageGridListItem filePath={filePath} aspectRatio={imageAspectRatio} />
    );
  }

  return (
    <BaseGridList
      items={filePaths}
      loading={isFetching}
      minItemWidth={120}
      renderItem={renderItem}
      listEmptyMessage="No image has been found."
    />
  );
}

export default ImageGridList;
