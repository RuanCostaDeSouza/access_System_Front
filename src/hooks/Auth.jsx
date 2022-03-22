import {createContext, useContext, useEffect, useState} from 'react';
import Cookies from 'universal-cookie';
import api from '../service/api';
import { toast } from 'react-toastify';
import jwt from 'jwt-decode';

const AuthContext = createContext();

export function AuthProvider({children}){
    const cookie = new Cookies();
    const areToken = cookie.get('token');

    const [token, setToken] = useState(areToken);
    const [user, setUser] = useState();

    useEffect(()=>{
        if(token){
            const decodedToken = jwt(token)
            
            api.get(`/user/${decodedToken.email}`)
                .then(response=>{
                    
                    setUser(response.data);
                })
                .catch(error=>{
                    setToken(false);
                    toast.warn('Usuário deslogado, favor entrar novamente');
                })
        }
    },[token])
    
    function tokenSetter(status){
        setToken(status); 
    }

    return (
        <AuthContext.Provider value={{token,tokenSetter, user}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}