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
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1', productRouter);

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
