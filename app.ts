import fs from 'fs';
import express from 'express';
import { dirname } from 'path';

type Dificulty = 'easy' | 'medium' | 'difficult';

interface ITour {
  id: number;
  name: string;
  duration: number;
  maxGroupSize: number;
  difficulty: Dificulty;
  summary: string;
  description: string;
  imageCover: string;
  images: string[];
  startDates: string[];
}

const app = express();

const tours: ITour[] = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8')
);

app.get('/api/v1/tours', (request, response) => {
  response.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

const port = 5000;
app.listen(port, () => {
  console.log(`API runnting on port ${port}`);
});

// interface User {
//   login: string;
//   name: string;
//   id: number;
// }

// const testUser: User = {
//   login: 'qunthunnan',
//   name: 'superUser',
//   id: 0,
// };

// app.get('/', (request, response) => {
//   //   response.status(200).send('Hello from Express server!');
//   response.status(200).json(testUser);
// });

// app.post('/', (request, response) => {
//   //   console.log(request);
//   response.status(200).send('slfsjlfs');
// });
