import axios from "axios";
axios.defaults.baseURL = "https://connections-api.herokuapp.com/"
const token = {
    set(token){
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    },
    outSet(){
        axios.defaults.headers.common.Authorization = "";
    }
}
// clietns
export const fetchClientsApi = () => {
    console.log(axios.defaults.headers.common.Authorization)
    try{
        console.log("re")
        return axios.get("/contacts").then(response=>response.data).catch(error=>error)
    }catch{
        console.log("error")
    }
    
}
export const fetchClientApi = async (id) => {
    return axios.get(`/contacts/${id}/`).then(response=> response.data).catch(error=>error)
}
export const addClientApi = (data) =>{
    return axios.post("/contacts/", data).then(({data})=>data).catch(error=>error)
}
export const deleteClientApi = (id) => {
    return axios.delete(`/contacts/${id}`).then(r=>r)
}
export const clientUpdateApi = async (data) => {
const numberId = Number(data.id)
    const newDataUp  = await axios.put(`/contacts/${numberId}`, data).then(({data})=>data)
    console.log(data.id)
    return newDataUp
}

//users - registration
export const userRegistration = async(data) =>{
    
    const resultAddUser =  await axios.post("users/signup/", data).then(({data})=>data ).catch(error=>error);
    console.log(resultAddUser)
    token.set(resultAddUser.token);
    console.log(axios.defaults.headers.common.Authorization)
    return resultAddUser
}

//users-login
export const authLogIn = async(data) =>{
    console.log(data)
    const resultLogin = await axios.post("users/login/", data).then(({data})=>data).catch(error=>error)
    token.set(resultLogin.token);
    console.log(axios.defaults.headers.common.Authorization)
    return resultLogin
}
//logout
export const authLogOut = async (data) =>{
    
    const result = await axios.post("users/logout/").catch(error=>error)
    console.log(axios.defaults.headers.common.Authorization)
    token.outSet()
    console.log(axios.defaults.headers.common.Authorization)
    return result
}

//authRestart
export const authRestartConnect = async(tok) =>{
    token.set(tok);
    const {data} = await axios.get("/users/current").catch(error=>error)
    console.log(data)
    return data
}