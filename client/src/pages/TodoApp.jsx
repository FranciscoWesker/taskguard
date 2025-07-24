import { useEffect, useState } from 'react';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  ListItemSecondaryAction,
  Fab,
  Chip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [filtro, setFiltro] = useState('todos');
  const { logout } = useAuth();

  const fetchTodos = async () => {
    const estadoParam = filtro === 'todos' ? '' : filtro === 'completado' ? 'completado' : 'pendiente';
    const res = await api.get(`/todos${estadoParam ? `?estado=${estadoParam}` : ''}`);
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtro]);

  const addTodo = async (e) => {
    e.preventDefault();
    if (!title) return;
    await api.post('/todos', { title });
    setTitle('');
    fetchTodos();
  };

  const toggleTodo = async (todo) => {
    await api.put(`/todos/${todo._id}`, { completed: !todo.completed });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await api.delete(`/todos/${id}`);
    fetchTodos();
  };

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            TaskGuard
          </Typography>
          <Button color="inherit" onClick={logout} size="small">
            Cerrar Sesión
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <form onSubmit={addTodo} style={{ display: 'flex', gap: 8 }}>
          <TextField
            label="Nueva tarea"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />
          <Button variant="contained" type="submit">
            Agregar
          </Button>
        </form>

        <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
          <Chip
            label="Todas"
            color={filtro === 'todos' ? 'primary' : 'default'}
            onClick={() => setFiltro('todos')}
          />
          <Chip
            label="Pendientes"
            color={filtro === 'pendiente' ? 'primary' : 'default'}
            onClick={() => setFiltro('pendiente')}
          />
          <Chip
            label="Completadas"
            color={filtro === 'completado' ? 'primary' : 'default'}
            onClick={() => setFiltro('completado')}
          />
        </div>

        <List sx={{ mt: 2 }}>
          {todos.map((t) => (
            <ListItem key={t._id} divider secondaryAction={
              <IconButton edge="end" onClick={() => deleteTodo(t._id)}>
                <DeleteIcon />
              </IconButton>
            }>
              <Checkbox checked={t.completed} onChange={() => toggleTodo(t)} />
              <ListItemText primary={t.title} sx={{ textDecoration: t.completed ? 'line-through' : 'none' }} />
            </ListItem>
          ))}
        </List>
      </Container>

      {/* Floating action button for mobile */}
      <Fab
        color="primary"
        aria-label="add"
        onClick={addTodo}
        sx={{ position: 'fixed', bottom: 24, right: 24, display: { xs: 'flex', md: 'none' } }}
      >
        <AddIcon />
      </Fab>
    </>
  );
} 