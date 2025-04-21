const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;
const JWT_SECRET = 'serekfebir'; 

app.use(cors());
app.use(express.json());


let users = [];
let todos = [];

// Middleware Auth
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; 

  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// ====== AUTH ROUTES ======

// Register
app.post('/api/auth/register', async (req, res) => {
  const { username, password } = req.body;

  const userExists = users.find(u => u.username === username);
  if (userExists) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: uuidv4(), username, password: hashedPassword };
  users.push(newUser);

  const token = jwt.sign({ id: newUser.id, username: newUser.username }, JWT_SECRET);
  res.json({ token });
});

// Login
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET);
  res.json({ token });
});

// ====== TODOS ROUTES  ======

// Get user's todos
app.get('/api/todos', authenticateToken, (req, res) => {
  const userTodos = todos.filter(todo => todo.userId === req.user.id);
  res.json(userTodos);
});

// Create a new todo
app.post('/api/todos', authenticateToken, (req, res) => {
  const task  = req.body;
  console.log("task", task);
  const newTodo = { 
                    id: uuidv4(), 
                    title: task.title,
                    date:task.date, 
                    status: task.status,
                    priority: task.priority ,
                    description: task.description, 
                    userId: req.user.id };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Update a todo
app.put('/api/todos/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const task = req.body;
  const todo = todos.find(todo => todo.id === id && todo.userId === req.user.id);
  if (!todo) return res.status(404).json({ message: 'Todo not found' });
  console.log('status', task.status);
  todo.title = task.title;
  todo.date = task.date;
  todo.status = task.status,
  todo.priority = task.priority,
  todo.description = task.description
  res.json(todo);
});

// Delete a todo
app.delete('/api/todos/:id', authenticateToken, (req, res) => {
  const { id } = req.params;

  const todoIndex = todos.findIndex(todo => todo.id === id && todo.userId === req.user.id);
  if (todoIndex === -1) return res.status(404).json({ message: 'Todo not found' });

  todos.splice(todoIndex, 1);
  res.json({ message: 'Todo deleted' });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
