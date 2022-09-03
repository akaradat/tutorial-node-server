const express = require('express');

const app = express();

app.use(express.json());

const DB = {
  courses: [],
  users: [],
};

function saveToDatabase(table, data) {
  const db = DB[table];
  data.id = db.length + 1;
  db.push(data);

  return data;
}

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/users', (req, res) => {
  res.json(DB['users']);
});

app.get('/api/courses', (req, res) => {
  res.json(DB['courses']);
});

app.post('/api/courses', (req, res) => {
  const data = req.body;

  const course = saveToDatabase('courses', {
    name: data.name,
    description: data.description,
    hours: data.hours,
    price: data.price,
    isPublic: 0,
  });

  res.json({
    id: course.id,
  });
});

app.post('/api/users', (req, res) => {
  const data = req.body;

  const users = saveToDatabase('users', {
    username: data.username,
    password: data.password,
    email: data.email,
    isAdmin: 0,
  });

  res.json({
    id: users.id,
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
