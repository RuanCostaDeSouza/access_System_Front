import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import api from '../service/api';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import {useState} from 'react'
import {useAuth} from '../hooks/Auth'
import jwt from 'jwt-decode';

export default function SignUp() {
  const theme = createTheme();
  const navigate = useNavigate()
  const { token, tokenSetter } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('')

  const handleSubmit =  (event) => {
    event.preventDefault();
    if(password !== confirm){
      toast.warn("passwords do not match")
      return
    }

    if(name == " "||password == " "|| email == " "){
      toast.warn("fill in all fields")
      return
    }
    const payload = {
        name,
        email,
        password,
    }
     api.post('/register', payload).then( (response) => {
        tokenSetter(response.data.token)
              
        var decodedToken = jwt(response.data.token);
        var date = new Date();
        
        date.setTime(date.getTime() + decodedToken.exp);
        document.cookie = 'token =' + response.data.token + ';expires=' + date.toGMTString() + '; SameSite=Strict; Secure; ';       
          toast.success('Registration completed successfully!')
          navigate('/')
        
        }).catch((erro)=>{
          if(erro){
            console.log(erro)
            toast.error('Email already exists!')
          } 
        })
  }


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="firstName"
                  label="Complete name"
                  autoFocus
                  onChange={({target})=>setName(target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={({target})=>setEmail(target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={({target})=>setPassword(target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirm"
                  label="Confirm Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={({target})=>setConfirm(target.value)}
                />
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
  );
}