import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectMovieSearchResultIds,
  selectMovieSearchIsFetching,
  selectPersonSearchIsFetching,
  selectPersonSearchResultIds
} from "reducers/pagination";
import { selectMovieById, selectPersonById } from "reducers";
import AutoSearch from "components/AutoSearch";
import { fetchMovieSearch, fetchPersonSearch } from "actions";
import { DEFAULT_FIRST_PAGE } from "reducers/paginate";
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar
} from "@material-ui/core";
import { getImageUrl } from "utils";

function MultiAutoSearch({ className, history, autoFocus }) {
  const [searchValue, setSearchValue] = useState("");
  const isFetchingMovies = useSelector(state =>
    selectMovieSearchIsFetching(state, searchValue)
  );
  const movieIds =
    useSelector(state => selectMovieSearchResultIds(state, searchValue)) || [];
  const movies = useSelector(state =>
    movieIds.map(movieId => selectMovieById(state, movieId))
  );
  const isFetchingPeople = useSelector(state =>
    selectPersonSearchIsFetching(state, searchValue)
  );
  const personIds =
    useSelector(state => selectPersonSearchResultIds(state, searchValue)) || [];
  const people = useSelector(state =>
    personIds.map(personId => selectPersonById(state, personId))
  );
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (searchValue) {
      dispatch(fetchMovieSearch(searchValue, DEFAULT_FIRST_PAGE));
      dispatch(fetchPersonSearch(searchValue, DEFAULT_FIRST_PAGE));
    }
  }, [dispatch, searchValue]);

  function handleInputValueChange(inputValue) {
    setSearchValue(inputValue);
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
          <ListItem>
            <ListItemAvatar>
              <Avatar
                src={getImageUrl(suggestion.poster_path)}
                alt={suggestion.title}
              />
            </ListItemAvatar>
            <ListItemText primary={suggestion.title} />
          </ListItem>
        ) : (
          <ListItem>
            <ListItemAvatar>
              <Avatar
                src={getImageUrl(suggestion.profile_path)}
                alt={suggestion.title}
              />
            </ListItemAvatar>
            <ListItemText primary={suggestion.name} />
          </ListItem>
        )
      }
      loading={isFetchingMovies || isFetchingPeople}
      onPressEnter={handleRedirect}
      onItemSelect={handleSelectSuggestion}
      onInputValueChange={handleInputValueChange}
      autoFocus={autoFocus}
    />
  );
}

export default withRouter(MultiAutoSearch);
