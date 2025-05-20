import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
const app = express();

import dotenv from 'dotenv';
import UsersData from './models/UsersData.js';

dotenv.config();

// Recreate __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));


// Routes
app.get('/', (req, res) => {
  res.render('index'); // Looks for views/index.ejs
});



app.post('/form-submit', async (req, res) => {
  try {
    const { name, email, mobile, age, password } = req.body;
    const user = new UsersData({ name, email, mobile, age, password });

    await user.save();

    res.json({
      success: true,
      message: 'User data saved successfully!',
     // data: user,
    });
  } catch (err) {
    console.error('Error saving user:', err);
    res.status(500).json({
      success: false,
      message: 'Error saving user data.',
    });
  }
});


// Dynamic port for production hosting (e.g., Railway)
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



export default app;