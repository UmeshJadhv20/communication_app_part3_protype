// server.js
const express = require('express');
const cors = require('cors');
const Routes = require('./routes/route');
const userController = require('./controllers/userController');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', Routes);

// Static folder for uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.get('/users', (req, res) => {
//   userController.getAllUsers(req, res);
// });

app.get('/', (req, res) => {
  res.send('Welcome to the communication app API');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

