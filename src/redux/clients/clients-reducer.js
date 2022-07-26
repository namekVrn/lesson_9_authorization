import { combineReducers } from 'redux';
import { createReducer,createSlice } from '@reduxjs/toolkit';
import { updateClient, deleteClient, addClient, fetchClientsGet } from './clients-operation';

const initialState = {
  name: null,
  number: null
}
// export const itemsReducer = createReducer([], {
//   [fetchClientsGet]: (state, { payload }) => payload,
//   [addClient]: (store, { payload }) => [payload, ...store],
//   [deleteClient]: (state, { payload }) =>
//     state.filter(({ id }) => id !== payload),
//     [clientUpdate]: (state, {payload}) => state.map(el => (Number(el.id) === Number(payload.id)) ? {...el, payload}: el)
//     // state.map(el => (el.id === payload.id ? (payload) : el))
// });
  const clientsItems = createSlice({
  name: "clientsItems",
  initialState,
  extraReducers: {
    [fetchClientsGet.fulfilled]: (state, {payload}) => state = payload,
    [addClient.fulfilled]: (state, {payload}) => [state, ...payload],
    [deleteClient.fulfilled]: (state, {payload}) => state.filter(({id}) => id !== payload.id),
    [updateClient.fulfilled]: (state, {payload}) => state.map(el => (Number(el.id) === Number(payload.id)) ? {...el, payload}: el)
  }
 })

// const loading = createReducer(false, {
//   [fetchClients]: () => false,
//   [fetchClientsLoading]: () => true,
//   [fetchClientsError]: () => false,
//   [clientsAdd]: () => false,
//   [addClientsLoading]: () => true,
//   [addClientsError]: () => false,
//   [deleteClient]: () => false,
//   [deleteClientsLoading]: () => true,
//   [deleteClientsError]: () => false,
//   [clientUpdate]: ()=> false,
//   [updateClientLoading]: ()=>true
// });

// const clients = combineReducers({
//   client: clientsItems,
  
// });

export default clientsItems.reducer;
