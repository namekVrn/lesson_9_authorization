import { Route, Routes } from 'react-router-dom';
import { PrivateRoute,PublicRoute } from './utils/PrivateRoute';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Layout from './layout/Layout';
import Main from './Main/Main';
import TarifsUsers from './TarifsUsers/TarifsUsers';
import AddClients from './AddClients/AddClients';
import Tickets from './Tickets/Tickets';
import ClientList from './ClientList/ClientList';
import ClientCard from './ClientCard/ClientCard';
import AuthReg from './AuthReg/AuthRed';
import AuthView from './AuthView/AuthView'
import {authRestartOperation} from '../redux/auth/auth-operation';
import 'antd/dist/antd.css'
import '../components/app.css'
export const App = () => {

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(authRestartOperation())
  },[dispatch])
  return (
    <div className="center">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/authView" element={<PublicRoute redirectTo="/main" restricted={true}><AuthView/></PublicRoute>} />
          <Route index path="/authReg" element={<PublicRoute redirectTo="/main" restricted={true}><AuthReg/></PublicRoute>} />
          <Route path="/main" element={<Main />} />
          <Route path='/addClients' element={<PrivateRoute ><AddClients/></PrivateRoute>} />
          <Route path='/tarifs' element={<PrivateRoute><TarifsUsers /></PrivateRoute>} />
          <Route path="/clientList" element={<ClientList />} />
          <Route path="/clientList/:idElem/" element={<ClientCard/>}/>
          <Route path="/tickets" element={<Tickets />} />
          <Route path="*" element={<p>not found</p>} />
        </Route>
      </Routes>
    </div>
  );
};
