import {createSlice} from '@reduxjs/toolkit';
import {act} from 'react';

const initialState = {
  token: '',
  likeResult: [],
  bookmarkResult: [],
  categorywiseData: [],
  registeruser: [],
};
const movieSlice = createSlice({
  name: 'movieData',
  initialState,
  reducers: {
    auth: (state, action) => {
      console.log('v', action.payload);
      state.token = action.payload;
    },
    addLike: (state, action) => {
      console.log('like', action.payload);
      // state.likeResult = [];
      const data = state?.likeResult;
      console.log('data', data);
      const response = data.some(item => {
        return item.title === action.payload.title;
      });
      console.log('response', response);
      if (!response) {
        state.likeResult.push(action.payload);
      }
      console.log('like array', state.likeResult);
    },
    removeLike: (state, action) => {
      const data = state?.likeResult;
      const response = data.filter(item => item.title !== action.payload.title);
      console.log('response filter', response);

      state.likeResult = response;
      console.log('disLike array', state.likeResult);
    },
    addBookmark: (state, action) => {
      console.log('bookmark added');
      const data = state?.bookmarkResult;
      console.log('data', data);
      const response = data.some(item => {
        return item.title === action.payload.title;
      });
      console.log('response', response);
      if (!response) {
        state.bookmarkResult.push(action.payload);
      }
      console.log('bookmark array', state.bookmarkResult);
    },

    deleteBookmark: (state, action) => {
      const data = state?.bookmarkResult;
      const response = data.filter(item => item.title !== action.payload.title);
      console.log('response filter', response);

      state.bookmarkResult = response;
      console.log('disLike array', state.bookmarkResult);
    },
    userRegistration: (state, action) => {
      const data = state.registeruser;
      console.log('data', data);
      const result = Array.isArray(data) ? data : [];

      const response = result.some(item => {
        return (
          item.email === action.payload.email &&
          item.password === action.payload.password
        );
      });
      if (!response) {
        state.registeruser.push(action.payload);
      }

      console.log('user register', state.registeruser);
    },
    categoryData: (state, action) => {
      state.categorywiseData = action.payload;
      console.log('categoryWise data', state.categorywiseData);
    },
  },
});
export const {
  auth,
  addLike,
  addBookmark,
  deleteBookmark,
  removeLike,
  categoryData,
  userRegistration,
} = movieSlice.actions;
export const reducer = movieSlice.reducer;
