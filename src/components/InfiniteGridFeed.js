import React from "react";
import InfiniteScrollWrapper from "components/InfiniteScrollWrapper";
import FlexGridList from "./FlexGridList";

function InfiniteGridFeed({
  items,
  loading,
  hasNextPage,
  onLoadMore,
  renderItem,
  itemWrapWidth,
  spacing,
  keyExtractor
}) {
  return (
    <InfiniteScrollWrapper
      hasNextPage={hasNextPage}
      loading={loading}
      onLoadMore={onLoadMore}
    >
      <FlexGridList
        keyExtractor={keyExtractor}
        items={items}
        loading={loading || hasNextPage}
        itemWrapWidth={itemWrapWidth}
        spacing={spacing}
        renderItem={renderItem}
      />
    </InfiniteScrollWrapper>
  );
}

export default InfiniteGridFeed;
