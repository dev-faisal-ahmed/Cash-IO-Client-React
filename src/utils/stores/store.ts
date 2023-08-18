import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { userReducer } from './userReducer';
import { apiReducer } from './apiReducer';

const reducers = combineReducers({
  user: userReducer,
  api: apiReducer,
});
const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['api'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});
