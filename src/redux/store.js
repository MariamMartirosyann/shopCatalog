import { configureStore } from '@reduxjs/toolkit'
import commnReducer from "./commonSlice"


const store = configureStore({
  reducer: {
   common:commnReducer
  },
})
export default store;