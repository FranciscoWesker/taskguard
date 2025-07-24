const express = require('express');
const Todo = require('../models/Todo');
const auth = require('../middleware/auth');
const router = express.Router();

// Obtener todas las tareas del usuario con filtro opcional ?estado=pending|completado
router.get('/', auth, async (req, res) => {
  const { estado } = req.query;
  const filter = { user: req.user._id };
  if (estado === 'completado') filter.completed = true;
  else if (estado === 'pendiente') filter.completed = false;

  try {
    const todos = await Todo.find(filter).sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error de servidor' });
  }
});

// Crear nueva tarea
router.post('/', auth, async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ message: 'Título requerido' });

  try {
    const todo = await Todo.create({ user: req.user._id, title });
    res.status(201).json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error de servidor' });
  }
});

// Actualizar tarea
router.put('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { title, completed },
      { new: true }
    );
    if (!todo) return res.status(404).json({ message: 'Tarea no encontrada' });
    res.json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error de servidor' });
  }
});

// Eliminar tarea
router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findOneAndDelete({ _id: id, user: req.user._id });
    if (!todo) return res.status(404).json({ message: 'Tarea no encontrada' });

    res.json({ message: 'Tarea eliminada' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error de servidor' });
  }
});

module.exports = router; 