
import { userRegistration, authLogIn, authLogOut,authRestartConnect } from 'components/utils/api';
import { useSelector, useDispatch } from 'react-redux';
import { createAsyncThunk } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { Action } from 'history';
const initialState = {
  user: {name: null, email: null},
  token: null,
  isLoad: null
}

//registration users
export const registrationUser = createAsyncThunk(
  'users/registration',
  async (data)=>{
    const clients = await userRegistration(data);
    console.log(clients)
    return clients
})


//logIn
export const logIn = createAsyncThunk(
  "user/logIn",
  async (data)=>{
    try{
      const user = await authLogIn(data)
      return user
    }catch{
      console.log("Что пошло не так !")
    }
    
  }
  )


//auth refresh
export const authRestartOperation = createAsyncThunk('auth/authRestart', async (_,thunkAPI) => {
 
  const {auth} = thunkAPI.getState()
    if(auth.token === null){
      console.log("thunkAPI.rejectWith")
      return 
    }
    try{
      const resultRestart = await authRestartConnect(auth.token);
      return resultRestart
    }catch{
      console.log("error")
    }

} )

//logOut на createAsyncThunck

export const logOut = createAsyncThunk(
  "user/logOut",
  async (data)=>{
  return  await authLogOut(data)
  }
  )

