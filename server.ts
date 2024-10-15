import mongoose from 'mongoose';
import { env } from './dotenv';
import { app } from './app';
import { error } from 'console';

if (env.parsed && 'DATABASE' in env.parsed && 'DB_PASSWORD' in env.parsed) {
  mongoose
    .connect(
      env.parsed.DATABASE.replace('<db_password>', env.parsed.DB_PASSWORD),
    )
    .then((con) => {
      console.log('DB Connectend!');
    })
    .catch((error) => {
      throw error;
    });

  // const tourSchema = new mongoose.Schema({
  //   name: {
  //     type: String,
  //     require: [true, 'Name is required'],
  //     unique: true,
  //   },
  //   rating: {
  //     type: Number,
  //     default: 4.5,
  //   },
  //   price: {
  //     type: Number,
  //     require: [true, 'Price is required'],
  //   },
  // });

  // const Tour = mongoose.model('Tour', tourSchema);

  // const tourSendData = new Tour({
  //   name: 'Bakuriani',
  //   rating: 4.7,
  //   price: 370,
  // });

  // tourSendData
  //   .save()
  //   .then((response) => {
  //     console.log(response);
  //   })
  //   .catch((error) => {
  //     throw error;
  //   });

  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`API runnting on port ${port}`);
  });
} else throw new Error('Environment config error.');
