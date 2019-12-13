import rootReducer from "reducers";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [
    ...getDefaultMiddleware({ serializableCheck: false }),
    sagaMiddleware
  ]
});

store.runSaga = sagaMiddleware.run;

export default store;
