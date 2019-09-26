import { createStore, applyMiddleware } from "redux";
import rootReducer from "reducers";
import thunkMiddleware from "redux-thunk";
import callAPIMiddleware from "middlewares/callAPIMiddleware";
import { composeWithDevTools } from "redux-devtools-extension";

// https://redux.js.org/recipes/configuring-your-store
function configureStore(preloadedState) {
  const middlewares = [thunkMiddleware, callAPIMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];

  // Without devTools:
  // ("compose" is from redux)
  // const composedEnhancers = compose(...enhancers);
  const composedEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  // https://redux.js.org/recipes/configuring-your-store#hot-reloading
  // We are enabling "hot reloading", which means replacing pieces of code without restarting the whole app.
  if (process.env.NODE_ENV !== "production" && module.hot) {
    // We're watching the ../reducers module, and passing the updated rootReducer
    // to the store.replaceReducer method when it changes.
    module.hot.accept("reducers", () => store.replaceReducer(rootReducer));
  }

  return store;
}

export default configureStore;
