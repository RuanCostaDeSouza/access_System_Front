import * as React from 'react';
import Box from '../components/Box';
import Container from '../components/Container';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import api from '../service/api';
import { useAuth } from '../hooks/Auth';

export default function Change() {
    const {user} = useAuth();
    const navigate = useNavigate()
    const [newPassword, setNewPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    
    const changeSubmit =  (event) => {
        event.preventDefault();

        if(newPassword == " "){
            toast.warn("fill in all fields")
            return
        }
        if(newPassword !== confirm){
            toast.warn("passwords do not match")
            return
        }
        const payload = {
            newPassword
        }
        console.log (user.id)
         api.put(`/change/password/${user?.id}`, payload).then( () => {
            toast.success('Password changed successfully!')
            navigate('/profile')
            
            }).catch((erro)=>{
              if(erro){
                console.log(erro)
                toast.error('Internal server error!')
              } 
            })
      }

  return (
    <Container>
        <Box>
            <TextField 
            id="outlined" 
            label="New Password" 
            type="password"
            variant="outlined" 
            onChange={({target})=>setNewPassword(target.value)}
            />
            <TextField 
            id="outlined-basic" 
            label="Confirm Password" 
            variant="outlined" 
            type="password"
            margin="normal"
            onChange={({target})=>setConfirm(target.value)}
            />
            <Stack spacing={2} direction="row" margin="normal">
              <Button variant="contained" onClick={changeSubmit}>Change password</Button>
              <Button variant="contained" href='/profile'>Cancel</Button>
              
            </Stack>

            

        </Box>
    </Container>

   
 
  );
}
