import rootReducer from "reducers";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { createEpicMiddleware } from "redux-observable";
import createSagaMiddleware from "redux-saga";

const epicMiddleware = createEpicMiddleware();

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [
    ...getDefaultMiddleware({ serializableCheck: false }),
    epicMiddleware,
    sagaMiddleware
  ]
});

store.runEpic = epicMiddleware.run;

store.runSaga = sagaMiddleware.run;

export default store;
