import { configureStore } from '@reduxjs/toolkit'
import changeSlice from './Slice';
import API_Data from './API_Data';

export default configureStore({
  reducer: {
    changeSlice: changeSlice,
    API_Data :API_Data
  }
})
