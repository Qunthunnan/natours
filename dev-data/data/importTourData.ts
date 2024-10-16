import fs from 'fs';
import mongoose from 'mongoose';
import { Tour } from '../../models/tourModel';
import { env } from '../../dotenv';

if (
  env.parsed &&
  'DATABASE_LOCAL' in env.parsed &&
  'DB_PASSWORD' in env.parsed
) {
  const DB = env.parsed.DATABASE_LOCAL.replace(
    '<db_password>',
    env.parsed.DB_PASSWORD,
  );

  const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'),
  );

  mongoose
    .connect(DB)
    .then((con) => {
      console.log('Mongo connectend!');
    })
    .catch((error) => {
      throw error;
    });

  if (process.argv.find((arg) => arg === '--delete')) {
    Tour.deleteMany()
      .then(() => {
        console.log('Deleted!');
        process.exit();
      })
      .catch((error) => {
        throw error;
      });
  } else {
    Tour.create(tours)
      .then(() => {
        console.log('Imported!');
        process.exit();
      })
      .catch((error) => {
        throw error;
      });
  }
} else {
  throw new Error('Environment config error');
}
