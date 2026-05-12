import dotenv from 'dotenv';
dotenv.config({
  path: './.env',
});
import dns from 'node:dns/promises';
dns.setServers(['1.1.1.1']);
import productRouter from './routes/product.route.js';
import express from 'express';
import chalk from 'chalk';
import { connectDB } from './db/connection.js';
import path from 'node:path';
const app = express();
const __dirname = path.resolve();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1', productRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
}
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/dist/index.html'));
});
connectDB()
  .then((connection) => {
    console.log(chalk.magenta('connected to database'));
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(chalk.yellow.bgBlack(`server is running on port ${PORT}`));
    });
  })
  .catch((err) => {
    console.log(chalk.redBright(err));
  });
