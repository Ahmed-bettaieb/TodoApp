require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Todo = require('./models/Todo');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// JWT Authentication Middleware
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

// ===== AUTH ROUTES =====

// Register
app.post('/api/auth/register', async (req, res) => {
  const { email, username, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: 'Email already in use' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, username, password: hashedPassword });
  await newUser.save();

  const token = jwt.sign(
    { id: newUser._id, email: newUser.email, username: newUser.username },
    JWT_SECRET
  );
  res.json({ token });
});

// Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign(
    { id: user._id, email: user.email, username: user.username },
    JWT_SECRET
  );
  res.json({ token });
});

// ===== TODOS ROUTES =====

// Get user's todos
app.get('/api/todos', authenticateToken, async (req, res) => {
  const todos = await Todo.find({ userId: req.user.id });
  res.json(todos);
});

// Create a new todo
app.post('/api/todos', authenticateToken, async (req, res) => {
  const { title, description, date, status, priority } = req.body;

  const newTodo = new Todo({
    title,
    description,
    date,
    status,
    priority,
    userId: req.user.id
  });

  await newTodo.save();
  res.status(201).json(newTodo);
});

// Update a todo
app.put('/api/todos/:id', authenticateToken, async (req, res) => {
  
  const  id  = req.params.id;
  const { title, description, date, status, priority } = req.body;

  
  const todo = await Todo.findById(id);
  console.log(todo);
  if (!todo) return res.status(404).json({ message: 'Todo not found' });
  todo.title = title;
  todo.description = description;
  todo.date = date;
  todo.status = status;
  todo.priority= priority;
  await todo.save();

  res.json(todo);
});

// Delete a todo
app.delete('/api/todos/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  const result = await Todo.findOneAndDelete({ _id: id });
  if (!result) return res.status(404).json({ message: 'Todo not found' });
  res.json({ message: 'Todo deleted' });
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
