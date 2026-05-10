import dotenv from 'dotenv';
dotenv.config({
  path: './.env',
});
import express from 'express';
import chalk from 'chalk';
import { connectDB } from './db/connection.js';
const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'hello world' });
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
