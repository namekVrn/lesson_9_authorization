import { createAsyncThunk } from '@reduxjs/toolkit';
import { dataOpt } from 'components/utils/dateOptions';
import {
  fetchClientsApi,
  addClientApi,
  deleteClientApi,
  clientUpdateApi,

} from '../../components/utils/api';

export const fetchClientsGet = createAsyncThunk(
  'fetchClients',
  async ()=>{
    try{
      const clientsList = await fetchClientsApi()
      console.log(clientsList)
      return clientsList
    }catch{
      console.log("что-то пошло не так")
    }
    
  }
)
// export const fetchClientsGet = () => async dispatch => {
//   dispatch(fetchClientsLoading());
//   try {
//     const clients = await fetchClientsApi();
//     console.log(clients)
//     dispatch(fetchClients(clients));
//   } catch {
//     dispatch(fetchClientsError());
//   }
// };


// addClient
export const addClient = createAsyncThunk(
  'addClient',
  async (data)=>{
    const contacts = {
          ...data,
          date: dataOpt
        };
        try{
          const resultingArray = await addClientApi(contacts);
        }catch{
         console.log("Сработал catch на addClient")
        }
    
  }
)
// export const addClient = data => async dispatch => {
//   const contacts = {
//     ...data,
//     date: new Date().toLocaleDateString('ru', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       hour: 'numeric',
//       minute: 'numeric',
//       second: 'numeric',
//     }),
//   };
//   dispatch(addClientsLoading());
//   try {
//     const client = await addClientApi(contacts);
//     dispatch(clientsAdd(client));
//   } catch {
//     dispatch(addClientsError());
//   }
//   console.log();
// };

//updateClient
export const updateClient = createAsyncThunk(
  'updateClient',
  async (data)=>{
    try{
      const updateClientItem = await clientUpdateApi(data)
      return updateClientItem
    }catch{
      console.log("Что-то пошло не так при обновлении")
    }
  }
)
// export const updateClient = (data) => async dispatch => {
//   dispatch(updateClientLoading())
//   const updateClientItem = await clientUpdateApi(data)
//   console.log(updateClientItem)
//   dispatch(clientUpdate(updateClientItem))
  
//   // dispatch(clientUpdate({...updateClientItem}))
// }

//deleteClient
export const deleteClient = createAsyncThunk(
  'deleteClient',
  async (id)=>{
    try{
      const deleteClientId = await deleteClientApi(id);
      return deleteClientId
    }catch{
      console.log('Что-то пошло не так при удалении')
    }
  }
)
// export const clientDelete = id => async dispatch => {

//   dispatch(deleteClientsLoading());

//   try {
//     const deleteClientId = await deleteClientApi(id);
//     dispatch(deleteClient(id));
//     console.log(deleteClientId);
//   } catch {
//     deleteClientsError();
//   }
// };
