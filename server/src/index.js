const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory data store
const db = {
  users: [{ username: 'standard_user', password: 'secret_sauce' }],
  items: [
    { _id: '1', name: 'Sauce Labs Backpack', price: 29.99 },
    { _id: '2', name: 'Sauce Labs Bike Light', price: 9.99 },
    { _id: '3', name: 'Sauce Labs Bolt T-Shirt', price: 15.99 }
  ],
  carts: {} // username -> array of item ids
};

// Auth endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = db.users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  res.json({ token: 'fake-jwt', username });
});

// Items endpoints
app.get('/api/items', (req, res) => {
  res.json(db.items);
});

// Cart endpoints
app.post('/api/cart', (req, res) => {
  const { username, itemId } = req.body;
  if (!db.carts[username]) db.carts[username] = [];
  db.carts[username].push(itemId);
  const items = db.carts[username].map(id => db.items.find(i => i._id === id));
  res.json({ username, items });
});

app.get('/api/cart', (req, res) => {
  const { username } = req.query;
  const items = (db.carts[username] || []).map(id => db.items.find(i => i._id === id));
  res.json({ username, items });
});

// Static client
const publicDir = path.join(__dirname, '../../client');
app.use(express.static(publicDir));
app.get('*', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
