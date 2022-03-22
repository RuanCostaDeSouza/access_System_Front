import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/Auth";
import { toast } from "react-toastify";
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/";
import Template404 from './pages/404';
import Change from "./pages/ChangePassword" 


const PrivateRoute = ({children, redirectTo})=>{
    const {token}= useAuth();
    useEffect(()=>{
      if(!token)toast.warn('É necessario estar logado paraacessar esta pagina!!')
    },[])
    return token ? children: <Navigate to={redirectTo}/>
}
  
const LoggedRoute = ({ children, redirectTo }) => {
    const { token } = useAuth();
    return token ? <Navigate to={redirectTo} /> : children;
}

export default function AllRoutes() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoggedRoute redirectTo='/'><Login /></LoggedRoute>} />
          <Route path='/register' element={<LoggedRoute redirectTo='/'><Register /></LoggedRoute>} />
          <Route path='/' element={<PrivateRoute redirectTo='/login'><Profile /></PrivateRoute>} />
          <Route path='/changepassword' element={<PrivateRoute redirectTo='/login'><Change /></PrivateRoute>} />
          <Route path='*' element={<Template404 />} />
        </Routes>
      </BrowserRouter>
    )
  }

