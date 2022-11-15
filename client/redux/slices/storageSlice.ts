import { PayloadAction } from "@reduxjs/toolkit";

const { createSlice, PayloadAction } = require("@reduxjs/toolkit");



const initialState:any = {
  listings: 'hi',
}

export const storageSlice = createSlice({
  name: 'Storage',
  initialState,
  reducers: {
    createListings: (state: any, action: PayloadAction<any>) => {
      return 'hi'
    }
  },
})



export default storageSlice.reducer;