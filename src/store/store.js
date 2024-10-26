import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {reducer} from './reducer/slice';

const persistConfig = {
  storage: AsyncStorage,
  key: 'root',
};
const rootReducer = combineReducers({
  movieData: reducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: persistedReducer,
});
export const persistor = persistStore(store);
