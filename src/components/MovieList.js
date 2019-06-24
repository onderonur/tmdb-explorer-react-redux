import React from "react";
import MovieCard from "containers/MovieCard";
import ColGridList from "./ColGridList";

function MovieList({ movieIds, loading }) {
  return (
    <ColGridList
      items={movieIds}
      loading={loading}
      colCount={{
        xs: 2,
        sm: 3,
        md: 4,
        lg: 5
      }}
      renderItem={movieId => <MovieCard key={movieId} movieId={movieId} />}
    />
  );
}

export default MovieList;
