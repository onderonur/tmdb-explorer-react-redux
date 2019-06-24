import React from "react";
import ColGridList from "./ColGridList";
import PersonCard from "containers/PersonCard";

function PersonList({ personIds, loading }) {
  return (
    <ColGridList
      items={personIds}
      loading={loading}
      colCount={{
        xs: 2,
        sm: 3,
        md: 4,
        lg: 5
      }}
      renderItem={personId => <PersonCard key={personId} personId={personId} />}
    />
  );
}

export default PersonList;
