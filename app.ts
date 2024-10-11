import fs from 'fs';
import express, { Request, Response } from 'express';
import { get } from 'http';

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

app.use(express.json());

const tours: ITour[] = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8')
);

function getTours(request: Request, response: Response): void {
  response.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
}

function createTour(request: Request, response: Response): void {
  if ('name' in request.body && 'difficulty' in request.body) {
    const id = tours[tours.length - 1].id + 1;
    const newTour = { ...request.body, id };
    tours.push(newTour);
    fs.writeFile(
      `${__dirname}/dev-data/data/tours-simple.json`,
      JSON.stringify(tours),
      (error) => {
        if (error) throw error;

        response.status(201).json({
          status: 'success',
          data: newTour,
        });
      }
    );
    console.log(`POST`);
    console.log(newTour);
  } else {
    response.status(500).json({
      status: 'Type error',
    });
  }
}

function getTour(request: Request, response: Response): void {
  const id = request.params.id;
  const requestedTour = tours.find((tour) => tour.id === +id);
  if (requestedTour) {
    response.status(200).json({
      status: 'success',
      data: requestedTour,
    });
  } else {
    response.status(404).json({
      status: 'Not found',
    });
  }
}

function updateTour(request: Request, response: Response): void {
  const id = +request.params.id;
  const updatedTour = { id, ...request.body };
  if (
    id <= tours.length &&
    'name' in request.body &&
    'difficulty' in request.body
  ) {
    const updatedTours: ITour[] = tours.map((tour) => {
      if (tour.id === id) {
        return updatedTour;
      }
      return tour;
    });
    fs.writeFile(
      `${__dirname}/dev-data/data/tours-simple.json`,
      JSON.stringify(updatedTours),
      (error) => {
        if (error) throw error;

        response.status(203).json({
          status: 'success',
          data: updatedTour,
        });
      }
    );
  } else {
    response.status(500).json({ status: 'Request error' });
  }
}

function deleteTour(request: Request, response: Response): void {
  const id = +request.params.id;
  if (id <= tours.length) {
    const updatedTours: ITour[] = tours.filter((tour) => tour.id !== id);
    fs.writeFile(
      `${__dirname}/dev-data/data/tours-simple.json`,
      JSON.stringify(updatedTours),
      (error) => {
        if (error) throw error;

        response.status(204).json({
          status: 'success',
          data: null,
        });
      }
    );
  } else {
    response.status(500).json({ status: 'Request error' });
  }
}

app.route('/api/v1/tours').get(getTours).post(createTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

// app.get('/api/v1/tours', getTours);

// app.get('/api/v1/tours/:id', (request, response) => {
//   const id = request.params.id;
//   const requestedTour = tours.find((tour) => tour.id === +id);
//   if (requestedTour) {
//     response.status(200).json({
//       status: 'success',
//       data: requestedTour,
//     });
//   } else {
//     response.status(404).json({
//       status: 'Not found',
//     });
//   }
// });

// app.post('/api/v1/tours', (request, response) => {
//   if ('name' in request.body && 'difficulty' in request.body) {
//     const id = tours[tours.length - 1].id + 1;
//     const newTour = { ...request.body, id };
//     tours.push(newTour);
//     fs.writeFile(
//       `${__dirname}/dev-data/data/tours-simple.json`,
//       JSON.stringify(tours),
//       (error) => {
//         if (error) throw error;

//         response.status(201).send({
//           status: 'success',
//           data: newTour,
//         });
//       }
//     );
//     console.log(`POST`);
//     console.log(newTour);
//   } else {
//     response.status(500).send({
//       status: 'Type error',
//     });
//   }
// });

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
