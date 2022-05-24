import { applyMiddleware, compose, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { ApplicationState } from '../types/store';
import { reducers } from './store-config';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['app', 'auth'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
  export interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: typeof compose;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const configureStore = (initialState?: unknown): Store<ApplicationState> => {
  const middleware = [thunk];

  const enhancers = [];
  const windowIfDefined = typeof window === 'undefined' ? null : (window as Window);
  if (windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__) {
    enhancers.push(windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__());
  }

  return createStore(persistedReducer, initialState, compose(applyMiddleware(...middleware), ...enhancers));
};

const store = configureStore();

const persistor = persistStore(store);

export { persistor, store };
