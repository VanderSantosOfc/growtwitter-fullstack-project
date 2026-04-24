import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Alert, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

export const Signup = () => {
  const [formData, setFormData] = useState({ name: '', username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await authService.register(formData);
      
      if (res.success) {
        alert("Conta criada com sucesso! Agora você já pode entrar.");
        navigate('/login');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao realizar cadastro.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ 
        mt: { xs: 4, sm: 8 }, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        textAlign: 'center',
        px: { xs: 2, sm: 0 }
      }}>
        <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold', mb: 3 }}>
          Criar sua conta
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
          <TextField 
            fullWidth 
            label="Nome Completo" 
            margin="normal" 
            required
            autoFocus
            onChange={e => setFormData({...formData, name: e.target.value})} 
          />
          <TextField 
            fullWidth 
            label="Username" 
            margin="normal" 
            required
            onChange={e => setFormData({...formData, username: e.target.value})} 
          />
          <TextField 
            fullWidth 
            label="Senha" 
            type="password" 
            margin="normal" 
            required
            onChange={e => setFormData({...formData, password: e.target.value})} 
          />

          {error && (
            <Alert severity="error" sx={{ mt: 2, textAlign: 'left' }}>
              {error}
            </Alert>
          )}

          <Button 
            fullWidth 
            variant="contained" 
            type="submit" 
            disabled={loading}
            sx={{ 
              mt: 3, 
              py: 1.5, 
              borderRadius: '20px', 
              fontWeight: 'bold', 
              textTransform: 'none',
              fontSize: '1rem' 
            }}
          >
            {loading ? 'Processando...' : 'Cadastrar'}
          </Button>

          <Box sx={{ mt: 3 }}>
            <Typography variant="body2" color="textSecondary">
              Já possui uma conta?{' '}
              <Link 
                component="button" 
                type="button"
                onClick={() => navigate('/login')} 
                sx={{ fontWeight: 'bold', textDecoration: 'none', cursor: 'pointer' }}
              >
                Entrar
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};