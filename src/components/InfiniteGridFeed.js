import React from "react";
import InfiniteScrollWrapper from "components/InfiniteScrollWrapper";
import FlexGridList from "./FlexGridList";

function InfiniteGridFeed({
  items,
  loading,
  hasNextPage,
  onLoadMore,
  renderItem,
  itemWrapWidth = 250,
  spacing = 1
}) {
  return (
    <InfiniteScrollWrapper
      hasNextPage={hasNextPage}
      loading={loading}
      onLoadMore={onLoadMore}
    >
      <FlexGridList
        items={items}
        loading={loading}
        itemWrapWidth={itemWrapWidth}
        spacing={spacing}
        renderItem={renderItem}
      />
    </InfiniteScrollWrapper>
  );
}

export default InfiniteGridFeed;
