const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bookRoutes = require('./routes/books');
const favoriteRoutes = require('./routes/favorites');

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.set('strictQuery', false); 

mongoose.connect('mongodb://localhost:27017/bookcatalog')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


app.use(bodyParser.json());
app.use(cors(
  {
    origin :["http://deploy-mern-lwhq.vercel.app"],
    methods: ["POST","GET"],
    credentials: true
  }
));
app.use('/api/books', bookRoutes);
app.use('/api/favorites', favoriteRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
