import express, { Response, NextFunction } from 'express';
import { ModifiedRequest } from './types/types';
import morgan from 'morgan';
import { toursRouter } from './routes/toursRouter';
import { usersRouter } from './routes/usersRouter';

function addRequestTime(
  request: ModifiedRequest,
  response: Response,
  next: NextFunction
): void {
  request.requestTime = new Date();
  next();
}

export const app = express();

app.use(express.json());
app.use(addRequestTime);
app.use(morgan('dev'));
app.use(express.static(`${__dirname}/public/`));

app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);

// app.route('/api/v1/tours').get(getTours).post(createTour);
// app
//   .route('/api/v1/tours/:id')
//   .get(getTour)
//   .patch(updateTour)
//   .delete(deleteTour);

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
