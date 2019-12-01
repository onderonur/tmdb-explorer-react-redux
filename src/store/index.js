import rootReducer from "reducers";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { createEpicMiddleware } from "redux-observable";

const epicMiddleware = createEpicMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [
    ...getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false
    }),
    epicMiddleware
  ]
});

store.runEpic = epicMiddleware.run;

export default store;
