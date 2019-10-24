import React from "react";
import InfiniteScrollWrapper from "components/InfiniteScrollWrapper";
import BaseGridList from "./BaseGridList";

function InfiniteGridList({
  items,
  loading,
  hasNextPage,
  onLoadMore,
  renderItem,
  minItemWidth,
  spacing,
  keyExtractor
}) {
  return (
    <InfiniteScrollWrapper
      hasNextPage={hasNextPage}
      loading={loading}
      onLoadMore={onLoadMore}
    >
      <BaseGridList
        keyExtractor={keyExtractor}
        items={items}
        loading={loading || hasNextPage}
        minItemWidth={minItemWidth}
        spacing={spacing}
        renderItem={renderItem}
      />
    </InfiniteScrollWrapper>
  );
}

export default InfiniteGridList;
