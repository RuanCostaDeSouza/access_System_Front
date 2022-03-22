import React from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from "../components/Box";
import Container from "../components/Container";
import { useAuth } from '../hooks/Auth';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

export default function Profile (){
  
  const { tokenSetter, token, user } = useAuth();
  const handleLogout = () => {

    document.cookie = `token=${token}; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');

    tokenSetter();
    toast.warn("Volte sempre");
    
    
}
  return (
    <>
      <Container>
          {user?
          <Box>
            <h2>Name: {user?.name}</h2>
            <h2>E-mail: {user?.email}</h2>
            <h2>registered since: {user?.createdAt}</h2>
            <Stack spacing={2} direction="row">
              <Button variant="contained" href="/changepassword">Change password</Button>
              <Button variant="outlined" onClick={handleLogout}>Logout</Button>
            </Stack>
          </Box>
          :
          <Box>
            <CircularProgress />
          </Box>
          }
      </Container>

    </>
  ) 
}

