const { configureStore, combineReducers } = require("@reduxjs/toolkit");
// const storageReducer = require("../redux/slices/storageSlice");
import storageSlice from "./slices/storageSlice";
console.log("Checking storage reducer: " + storageSlice);

// const store = configureStore({
// 	reducer: {
// 		storage: storageReducer,
// 	},
// })

const rootReducer = combineReducers({
  storageSlice,
});

const store = configureStore({
  reducer: rootReducer,
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
