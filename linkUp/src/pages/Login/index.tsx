import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography, Alert, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { setLogin } from '../../store/slices/authSlice';
import authService from '../../services/authService';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await authService.login({ username, password });
      if (res.success) {
        dispatch(setLogin({
          token: res.data.authToken,
          user: res.data.authUser
        }));
        navigate('/home');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao logar");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>Login</Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <TextField 
            fullWidth 
            label="Username" 
            margin="normal" 
            onChange={e => setUsername(e.target.value)} 
          />
          <TextField 
            fullWidth 
            label="Senha" 
            type="password" 
            margin="normal" 
            onChange={e => setPassword(e.target.value)} 
          />
          
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          
          <Button 
            fullWidth 
            variant="contained" 
            type="submit" 
            sx={{ mt: 3, py: 1.5, borderRadius: '20px', fontWeight: 'bold' }}
          >
            Entrar
          </Button>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="textSecondary">
              Não tem uma conta?{' '}
              <Link 
                component="button"
                type="button"
                onClick={() => navigate('/signup')} 
                sx={{ 
                  fontWeight: 'bold', 
                  textDecoration: 'none', 
                  cursor: 'pointer',
                  verticalAlign: 'baseline'
                }}
              >
                Inscreva-se
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
