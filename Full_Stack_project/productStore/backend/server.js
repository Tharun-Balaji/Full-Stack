
import express from 'express';
import { connectDB } from './config/db.js';


const app = express();

const PORT = process.env.PORT || 5000;

// console.log(process.env.MONGO_URI);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server started on port at http://localhost:${PORT}`);
});

// 371UZa0SpQQn6LYM