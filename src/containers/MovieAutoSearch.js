import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectMovieSearchResultIds,
  selectMovieSearchIsFetching
} from "reducers/pagination";
import { selectMovieById } from "reducers/entities";
import AutoSearch from "components/AutoSearch";
import { fetchMovieSearch, BASE_IMG_API } from "actions";
import { DEFAULT_FIRST_PAGE } from "reducers/paginate";
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar
} from "@material-ui/core";

function MovieAutoSearch({ history, autoFocus }) {
  const [searchValue, setSearchValue] = useState("");
  const isFetching = useSelector(state =>
    selectMovieSearchIsFetching(state, setSearchValue)
  );
  const movieIds =
    useSelector(state => selectMovieSearchResultIds(state, searchValue)) || [];
  const movies = useSelector(state =>
    movieIds.map(movieId => selectMovieById(state, movieId))
  );
  const dispatch = useDispatch();

  function handleRedirect(inputValue) {
    if (inputValue) {
      history.push(`/movie/search?query=${inputValue}`);
    } else {
      history.push("/movie/popular");
    }
  }

  function handleSelectMovie(selectedMovie) {
    history.push(`/movie/${selectedMovie.id}`);
  }

  useEffect(() => {
    const pageId = DEFAULT_FIRST_PAGE;
    if (searchValue) {
      dispatch(fetchMovieSearch(searchValue, pageId));
    }
  }, [dispatch, searchValue]);

  function handleInputValueChange(inputValue) {
    setSearchValue(inputValue);
  }

  return (
    <AutoSearch
      suggestions={movies}
      renderSuggestion={suggestion => (
        <ListItem>
          <ListItemAvatar>
            <Avatar
              src={`${BASE_IMG_API}/w500${suggestion.poster_path}`}
              alt={suggestion.title}
            />
          </ListItemAvatar>
          <ListItemText primary={suggestion.title} />
        </ListItem>
      )}
      loading={isFetching}
      onPressEnter={handleRedirect}
      onItemSelect={handleSelectMovie}
      onInputValueChange={handleInputValueChange}
      autoFocus={autoFocus}
    />
  );
}

export default withRouter(MovieAutoSearch);
