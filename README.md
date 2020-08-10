## TMDB Explorer: A React-Redux Application

**Note:** This project was a great practice to learn Redux recipes. And Redux is a great tool (redux-saga and @reduxjs/toolkit too). But it was a little bit of overkill for this project. It was used only for some kind of a caching mechanism. But, it was a little bit hard to maintain too. So, I've migrated this project to a simpler structure, added SSR with Next.js and let this one to be a React-Redux recipe application by itself. You can find the main project **[here](https://github.com/onderonur/tmdb-explorer)**.

**Live demo (for Next.js version) on Vercel is [here](https://tmdb-explorer.vercel.app/)**.

This is a tmdb (the Movie Db) explorer react-redux application that implements some of the [redux recipes](https://redux.js.org/recipes/recipe-index) like;

- Normalizing state shape (with [normalizr](https://github.com/paularmstrong/normalizr))

* Reusing reducer logic with higher-order reducers

- Computing derived data with selectors and colocating selectors with reducers to make state shape changes easy and isolated from component implementations. (So, we can change the redux state shape without touching one line of code of components).

* Immutable state updates (with [immer](https://github.com/immerjs/immer))

- Custom middleware to handle data fetching and caching.  
*Edit: Removed the custom middleware and used `redux-saga` instead.*

### Redux State Shape

I've chosen some kind of a "conceptual separation" for redux state structure. For example;

- entities: Contains all of the main domain objects and their relationships. Thanks to normalizr, this was accomplished by very little effort. It creates a SQL like referential structure between objects.
- isFetching: Shows which requests are in progress at the moment. Besides showing some loading indicators, it is used to not execute the same request at the same time. e.g., it prevents you to fetch a movie with the same id if you are already fetching it.
- pagination: Contains all of the paginated lists. It doesn't have any raw information about the entities. All of the fields other than "paging info" is referential. e.g., if you have a paginated list of movies, it shows what is the next page and how many items this list have etc. But it doesn't have any movie info. It just has id fields to reference movies in `entities`.

For larger projects some kind of a "domain based separation" may be used. But this approach was anough for a project at this scale.

### Hooks

Also there are no class components and only _react hooks_ are used in this project. I think hooks make it easy to see the repeating logic in the components and extract them to custom hooks creates some really strong pattern. They are much more maintainable than class component lifecycle functions and they create less bugs most of the time.

New `useSelector` and `useDispatch` hooks of react-redux are very useful too. You can see which props are derived from the redux store directly in the render scope. Jumping between component implementation and `mapStateToProps` or `mapDispatchToProps` can be mind bending sometimes. In the end, you are just selecting some data from store. Real simple and clean implementation.

You may use libraries like [reselect](https://github.com/reduxjs/reselect) to optimize/memoize selectors. But this project didn't have that kind of a optimization problem. It has simple selectors. But the pattern to create and use them is useful for scalable projects. It requires minimum effort to add new things or change the structure of the store.

Also, [material-ui](https://material-ui.com/) has released the version 4 and it has some cool hooks like `useTheme` to style your components and `useMediaQuery`. I've always liked CSS-in-JS and this approach with hooks is one of my favorites.

### Development

To run the project go to [TMDB](https://developers.themoviedb.org/3) and get an `api_key`. Copy and paste that `api_key` as `REACT_APP_API_KEY=<your_api_key>` in `.env` file without `<` and `>`.

Then just run;

### `npm install`

### `npm start`

### Netlify Deployment

You can see the configurations for [Netlify](https://www.netlify.com/) in the `netlify.toml` file. These configurations are required for Single Page Applications to run correctly when deployed to Netlify. Otherwise, application won't be loaded if you refresh the page when you are not at the root of the app (like if you have a search query, url param or routing path etc.) or directly enter a Url like these.

This configuration specifies the build command, output folder for the build process and it tells Netlify to return the `index.html` file for every possible path (`/*`).
