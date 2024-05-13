import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers.js';
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from "redux-persist";


const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/REGISTER'], // Add any actions to ignore
          ignoredPaths: ['some.path.to.ignore'], // Add paths in state to ignore
        },
      }),
});
export const persistor = persistStore(store);
export default store;