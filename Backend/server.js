import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.use('/api/products', productRoutes); 

connectDB()
  .then(() => {
    app.listen(port, () => console.log(`http://localhost:${port}`));
  })
  .catch((err) => {
    console.error('Failed to connect DB:', err);
  });
