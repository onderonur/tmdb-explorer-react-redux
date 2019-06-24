import React from "react";
import InfiniteScrollWrapper from "components/InfiniteScrollWrapper";
import ColGridList from "components/ColGridList";

function InfiniteGridFeed({
  items,
  loading,
  hasNextPage,
  onLoadMore,
  renderItem
}) {
  return (
    <InfiniteScrollWrapper
      hasNextPage={hasNextPage}
      loading={loading}
      onLoadMore={onLoadMore}
    >
      <ColGridList
        items={items}
        loading={loading}
        colCount={{
          xs: 2,
          sm: 3,
          md: 4,
          lg: 5
        }}
        renderItem={renderItem}
      />
    </InfiniteScrollWrapper>
  );
}

export default InfiniteGridFeed;
