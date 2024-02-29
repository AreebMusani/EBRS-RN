import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Reducers
import userReducer from "../slices/user";

// Root Reducer
const rootReducer = combineReducers({
  user: userReducer,
});

// Define the root state type
type RootState = ReturnType<typeof rootReducer>;

// Persist Config
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

// Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store
const store = configureStore({
  reducer: persistedReducer,
});

// Persistor
const persistor = persistStore(store);

store.subscribe(() =>
  console.log("Redux Data =>", JSON.parse(JSON.stringify(store.getState())))
);

export { store, persistor };
