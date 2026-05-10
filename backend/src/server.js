import express from 'express';
import chalk from 'chalk';
const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'hello world' });
});

app.listen(5000, () => {
  console.log(chalk.whiteBright('server is running on port 5000'));
});
