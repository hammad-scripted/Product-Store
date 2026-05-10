import mongoose from 'mongoose';
import chalk from 'chalk';
export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    return connection;
  } catch (err) {
    console.log(chalk.redBright(err));
  }
};
