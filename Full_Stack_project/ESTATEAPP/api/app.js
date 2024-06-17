
import express from 'express';
import postRoute from './routes/post.route.js';

const app = express();

app.use("/api/post", postRoute);

app.listen(8800, () => {
  console.log("Server running on port 8800...");
});