import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectors } from "reducers";
import AutoSearch from "components/AutoSearch";
import { fetchSearch } from "actions";
import PersonListItem from "./PersonListItem";
import MovieListItem from "./MovieListItem";
import useHistoryPush from "hooks/useHistoryPush";

function MovieAndPersonAutoSearch({ className, autoFocus }) {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const historyPush = useHistoryPush();

  const movieIds =
    useSelector((state) =>
      selectors.selectMovieSearchResultIds(state, searchValue)
    ) || [];
  const movies = useSelector((state) =>
    selectors.selectMovies(state, movieIds)
  );

  const personIds =
    useSelector((state) =>
      selectors.selectPersonSearchResultIds(state, searchValue)
    ) || [];
  const people = useSelector((state) =>
    selectors.selectPeople(state, personIds)
  );

  const isFetching = useSelector((state) =>
    selectors.selectIsFetchingSearch(state)
  );

  useEffect(() => {
    dispatch(fetchSearch(searchValue));
  }, [dispatch, searchValue]);

  function handleInputValueChange(inputValue) {
    setSearchValue(inputValue);
  }

  function handleRedirect(inputValue) {
    if (inputValue) {
      historyPush(`/search/movie?query=${inputValue}`);
    } else {
      historyPush("/movie/popular");
    }
  }

  function handleSelectSuggestion(selectedSuggestion) {
    if (selectedSuggestion) {
      switch (selectedSuggestion.suggestionType) {
        case "movie":
          historyPush(`/movie/${selectedSuggestion.id}`);
          break;
        case "person":
          historyPush(`/person/${selectedSuggestion.id}`);
          break;
        default:
          return;
      }
    }
  }

  let suggestions = [
    ...movies.map((movie) => ({ ...movie, suggestionType: "movie" })),
    ...people.map((person) => ({ ...person, suggestionType: "person" })),
  ].sort((a, b) =>
    a[a.suggestionType === "movie" ? "title" : "name"].localeCompare(
      b[b.suggestionType === "movie" ? "title" : "name"]
    )
  );

  return (
    <AutoSearch
      className={className}
      extractSuggestionKey={(suggestion) =>
        `${suggestion.suggestionType}_${suggestion.id}`
      }
      placeholder="Search Movies & People"
      suggestions={suggestions}
      renderSuggestion={(suggestion) =>
        suggestion.suggestionType === "movie" ? (
          <MovieListItem movieId={suggestion.id} />
        ) : (
          <PersonListItem personId={suggestion.id} />
        )
      }
      loading={isFetching}
      inputValue={searchValue}
      onInputValueChange={handleInputValueChange}
      onPressEnterOrClickSearch={handleRedirect}
      onItemSelect={handleSelectSuggestion}
      autoFocus={autoFocus}
    />
  );
}

export default MovieAndPersonAutoSearch;
