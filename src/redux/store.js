import { configureStore, getDefaultMiddleware, } from '@reduxjs/toolkit';
import {combineReducers} from 'redux'
import clientsItems from './clients/clients-reducer';
import usersAuthReducer from './auth/auth-reducer';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
const authConfig = {
    key: 'token',
    storage,
    whitelist: ['token']
  };
const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  // logger,
];



const store = configureStore({
    reducer: {
      clientsItems: clientsItems,
      auth: persistReducer(authConfig,usersAuthReducer),
     
    },
    devTools: process.env.NODE_ENV === 'development',
    middleware
  });
const persist = persistStore(store);
export {store, persist}  