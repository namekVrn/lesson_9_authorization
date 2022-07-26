
import { useSelector } from "react-redux";
import { Route, Router, Outlet, Navigate } from "react-router-dom";

export function PrivateRoute({ children }) {
    const auth = useSelector(state=>state.auth.isLoad);
    return auth ? children : <Navigate to="/authView" />;
  }

export function PublicRoute({children, redirectTo="/", restricted=false,}){
  const auth = useSelector(state=>state.auth.isLoad);
  const shouldRedirect = auth && restricted;
  return shouldRedirect ? <Navigate to={redirectTo} /> : children;
  
}