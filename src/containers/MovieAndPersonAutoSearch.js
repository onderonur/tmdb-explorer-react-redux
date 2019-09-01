import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectIsFetchingMovieSearchResults,
  selectMovieSearchResultIds,
  selectIsFetchingPersonSearchResults,
  selectPersonSearchResultIds,
  selectPeople
} from "reducers";
import AutoSearch from "components/AutoSearch";
import { fetchMovieSearch, fetchPersonSearch } from "actions";
import { DEFAULT_FIRST_PAGE } from "reducers/createPagination";
import { selectMovies } from "reducers";
import PersonListItem from "./PersonListItem";
import MovieListItem from "./MovieListItem";

function MovieAndPersonAutoSearch({ className, history, autoFocus }) {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");

  const movieIds =
    useSelector(state => selectMovieSearchResultIds(state, searchValue)) || [];
  const movies = useSelector(state => selectMovies(state, movieIds));

  const personIds =
    useSelector(state => selectPersonSearchResultIds(state, searchValue)) || [];
  const people = useSelector(state => selectPeople(state, personIds));

  const isFetchingMovies = useSelector(state =>
    selectIsFetchingMovieSearchResults(state, searchValue)
  );
  const isFetchingPeople = useSelector(state =>
    selectIsFetchingPersonSearchResults(state, searchValue)
  );

  useEffect(() => {
    if (searchValue) {
      dispatch(fetchMovieSearch(searchValue, DEFAULT_FIRST_PAGE));
      dispatch(fetchPersonSearch(searchValue, DEFAULT_FIRST_PAGE));
    }
  }, [dispatch, searchValue]);

  function handleInputValueChange(inputValue) {
    setSearchValue(inputValue);
  }

  function handleRedirect(inputValue) {
    if (inputValue) {
      history.push(`/search/movie?query=${inputValue}`);
    } else {
      history.push("/movie/popular");
    }
  }

  function handleSelectSuggestion(selectedSuggestion) {
    if (selectedSuggestion) {
      switch (selectedSuggestion.suggestionType) {
        case "movie":
          history.push(`/movie/${selectedSuggestion.id}`);
          break;
        case "person":
          history.push(`/person/${selectedSuggestion.id}`);
          break;
        default:
          return;
      }
    }
  }

  let suggestions = [
    ...movies.map(movie => ({ ...movie, suggestionType: "movie" })),
    ...people.map(person => ({ ...person, suggestionType: "person" }))
  ];

  suggestions = suggestions.sort((a, b) =>
    a[a.suggestionType === "movie" ? "title" : "name"].localeCompare(
      b[b.suggestionType === "movie" ? "title" : "name"]
    )
  );

  return (
    <AutoSearch
      className={className}
      extractSuggestionKey={suggestion =>
        `${suggestion.suggestionType}_${suggestion.id}`
      }
      placeholder="Search Movies & People"
      suggestions={suggestions}
      renderSuggestion={suggestion =>
        suggestion.suggestionType === "movie" ? (
          <MovieListItem movieId={suggestion.id} />
        ) : (
          <PersonListItem personId={suggestion.id} />
        )
      }
      loading={isFetchingMovies || isFetchingPeople}
      onInputValueChange={handleInputValueChange}
      onPressEnterOrClickSearch={handleRedirect}
      onItemSelect={handleSelectSuggestion}
      autoFocus={autoFocus}
    />
  );
}

export default withRouter(MovieAndPersonAutoSearch);
