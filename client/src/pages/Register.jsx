import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  Alert,
  Box,
} from '@mui/material';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login: doLogin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await api.post('/auth/register', { username, password });
      doLogin(res.data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Error');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 12 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" component="h1" align="center" gutterBottom>
          Registro
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
          />
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Registrar
          </Button>
        </Box>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          ¿Ya tienes cuenta?{' '}
          <Link component={RouterLink} to="/login">
            Inicia Sesión
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
} 