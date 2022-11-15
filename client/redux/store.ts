const { configureStore } = require("@reduxjs/toolkit");
const storageReducer = require('./slices/storageSlice');


const store = configureStore({
	reducer: {
		storage: storageReducer
	},
})

export type RootState = ReturnType<typeof store.getState>

export default store;
