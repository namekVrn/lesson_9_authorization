import { combineReducers } from 'redux';
import { createReducer, createSlice } from '@reduxjs/toolkit';

import {registrationUser, logIn, logOut,authRestartOperation } from '../auth/auth-operation';
const initialState = {
    user: {name: null, email: null},
    token: null,
    isLoad: false
  }
const usersAuthReducer = createSlice({
  name: "userAuth",
  initialState,
  extraReducers: {
    [registrationUser.fulfilled]: (store, { payload }) => 
      { 
        store.user = payload.user; 
        store.token = payload.token;
        store.isLoad = true;
      }
    ,
    [logIn.fulfilled]: (store, { payload }) => 
      {
        store.user = payload.user; 
        store.token = payload.token;
        store.isLoad = true;
      },
    [logOut.fulfilled]:(store, {payload}) => store = initialState,
    [authRestartOperation.fulfilled](store, {payload})
    {
      store.user = payload;
      store.isLoad = true;
    }
  }
})
// const usersAuthReducer = createReducer([initialState], {
//     [registrationUser.fulfilled]: (store, { payload }) => [{...payload, isLoad: true}],
//     [logIn.fulfilled]: (store, { payload }) => ({...payload, isLoad: true}),
//     [logOut.fulfilled]:(store, {payload}) => [{...payload}],
    
// })

  export default usersAuthReducer.reducer;