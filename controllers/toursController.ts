import { ModifiedRequest } from '../types/types';
import { Response, Request, NextFunction } from 'express';
import { Tour } from '../models/tourModel';
import { ApiFeatures } from '../utils/apiFeatures';
import { ITour } from '../types/types';

// import fs from 'fs';

export function topCheapTours(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const query = request.query;
  query.sort = '-ratingsAverage,price';
  query.limit = '5';
  next();
}

export async function getTours(
  request: ModifiedRequest,
  response: Response,
): Promise<void> {
  // //filtering request
  //   const initialQuery = { ...request.query };
  //   const excludedQueries = ['limit', 'page', 'fields', 'sort'];

  //   excludedQueries.forEach((exluded) => {
  //     delete initialQuery[exluded];
  //   });

  //   const advancedQuery = JSON.parse(
  //     JSON.stringify(initialQuery).replace(
  //       /\b(gte|gt|lte|lt)\b/g,
  //       (match) => `$${match}`,
  //     ),
  //   );

  //   let requestedQuery = Tour.find({ ...advancedQuery });

  //   // .where('duration')
  //   // .equals(5)
  //   // .where('averageRating')
  //   // .gte(4.8)

  //   //sorting request
  //   if (request.query.sort && typeof request.query.sort === 'string') {
  //     const sortBy = request.query.sort.split(',').join(' ');
  //     requestedQuery = requestedQuery.sort(sortBy);
  //   } else {
  //     requestedQuery = requestedQuery.sort('-createdAt');
  //   }

  //   //selecting fields
  //   if (request.query.fields && typeof request.query.fields === 'string') {
  //     const fields = request.query.fields.split(',').join(' ');
  //     requestedQuery = requestedQuery.select(fields);
  //   } else {
  //     requestedQuery = requestedQuery.select('-__v');
  //   }

  //   //Data pagination
  //   const limit = request.query.limit ? +request.query.limit : 20;
  //   const skip = request.query.page ? (+request.query.page - 1) * limit : 0;

  //   requestedQuery = requestedQuery.skip(skip).limit(limit);

  //   const docCountQuery = Tour.countDocuments({ ...advancedQuery });
  //   const docCount = await docCountQuery;

  //   if (request.query.limit && limit > 100) {
  //     response.status(400).json({
  //       status: 'failure',
  //       message:
  //         'Limit value is wrong. A maximum of 100 values ​​are allowed to be requested',
  //     });
  //     return undefined;
  //   }

  //   if (request.query.page && skip >= docCount) {
  //     response.status(404).json({
  //       status: 'failure',
  //       message: 'Tours not found at requested page.',
  //     });
  //     return undefined;
  //   }

  // executing

  const features = new ApiFeatures<typeof Tour, ITour>(
    Tour.find(),
    request.query,
  )
    .filter()
    .pagination()
    .select()
    .sort();

  //Recieving the answer
  features.query
    .then((tours) => {
      response.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
          tours,
        },
      });
    })
    .catch((error) => {
      response.status(400).json({
        status: 'failure',
        message: error.message,
      });
    });

  return undefined;
}

export function createTour(request: Request, response: Response): void {
  Tour.create(request.body)
    .then((tour) => {
      response.status(201).json({
        status: 'success',
        data: tour,
      });
    })
    .catch((error) => {
      response.status(400).json({
        status: 'failure',
        message: error.message,
      });
    });
}

export function getTour(request: Request, response: Response): void {
  Tour.findById(request.params.id)
    .then((tour) => {
      response.status(200).json({
        status: 'success',
        data: tour,
      });
    })
    .catch((error) => {
      response.status(400).json({
        status: 'failure',
        message: error.message,
      });
    });
}

export function updateTour(request: Request, response: Response): void {
  Tour.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
    runValidators: true,
  })
    .then((tour) => {
      response.status(200).json({
        status: 'success',
        data: tour,
      });
    })
    .catch((error) => {
      response.status(400).json({
        status: 'failure',
        message: error.message,
      });
    });
}

export function deleteTour(request: Request, response: Response): void {
  Tour.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).send();
    })
    .catch((error) => {
      response.status(400).json({
        status: 'failure',
        message: error.message,
      });
    });
}

// const tours: ITour[] = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
// );

// export function validateIdMiddleware(
//   request: Request,
//   response: Response,
//   next: NextFunction,
//   id: string
// ) {
//   const requestedTour = tours.find((tour) => tour.id === +id);
//   if (!requestedTour) {
//     return response.status(404).json({
//       status: 'Tour not found',
//     });
//   }

//   next();
// }

// export function validateTourMiddleware(
//   request: Request,
//   response: Response,
//   next: NextFunction
// ) {
//   if (!('name' in request.body && 'difficulty' in request.body)) {
//     response.status(400).json({
//       status: 'Tour data is wrong..',
//     });

//     return;
//   }

//   next();
// }

// export function getTours(request: ModifiedRequest, response: Response): void {
//   console.log(request.requestTime);
//   response.status(200).json({
//     status: 'success',
//     results: tours.length,
//     data: {
//       tours,
//     },
//   });
// }

// export function createTour(request: Request, response: Response): void {
//   const id = tours[tours.length - 1].id + 1;
//   const newTour = { ...request.body, id };
//   tours.push(newTour);
//   fs.writeFile(
//     `${__dirname}/../dev-data/data/tours-simple.json`,
//     JSON.stringify(tours),
//     (error) => {
//       if (error) throw error;

//       response.status(201).json({
//         status: 'success',
//         data: newTour,
//       });
//     }
//   );
//   console.log(`POST`);
//   console.log(newTour);
// }

// export function getTour(request: Request, response: Response): void {
//   const id = request.params.id;
//   const requestedTour = tours.find((tour) => tour.id === +id);

//   response.status(200).json({
//     status: 'success',
//     data: requestedTour,
//   });
// }

// export function updateTour(request: Request, response: Response): void {
//   const id = +request.params.id;
//   const updatedTour = { id, ...request.body };

//   const updatedTours: ITour[] = tours.map((tour) => {
//     if (tour.id === id) {
//       return updatedTour;
//     }
//     return tour;
//   });

//   fs.writeFile(
//     `${__dirname}/../dev-data/data/tours-simple.json`,
//     JSON.stringify(updatedTours),
//     (error) => {
//       if (error) throw error;

//       response.status(200).json({
//         status: 'success',
//         data: updatedTour,
//       });
//     }
//   );
// }

// export function deleteTour(request: Request, response: Response): void {
//   const id = +request.params.id;

//   const updatedTours: ITour[] = tours.filter((tour) => tour.id !== id);
//   fs.writeFile(
//     `${__dirname}/../dev-data/data/tours-simple.json`,
//     JSON.stringify(updatedTours),
//     (error) => {
//       if (error) throw error;

//       response.status(204).send();
//     }
//   );
// }
