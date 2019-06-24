export function getMovieReleaseYear(movie) {
  return new Date(movie.release_date).getFullYear();
}
