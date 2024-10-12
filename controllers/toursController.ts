import { ModifiedRequest, ITour } from '../types/types';
import { Response, Request, NextFunction } from 'express';
import fs from 'fs';

const tours: ITour[] = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
);

export function validateIdMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
  id: string
) {
  const requestedTour = tours.find((tour) => tour.id === +id);
  if (!requestedTour) {
    return response.status(404).json({
      status: 'Tour not found',
    });
  }

  next();
}

export function validateTourMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (!('name' in request.body && 'difficulty' in request.body)) {
    response.status(400).json({
      status: 'Tour data is wrong..',
    });

    return;
  }

  next();
}

export function getTours(request: ModifiedRequest, response: Response): void {
  console.log(request.requestTime);
  response.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
}

export function createTour(request: Request, response: Response): void {
  const id = tours[tours.length - 1].id + 1;
  const newTour = { ...request.body, id };
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
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
}

export function getTour(request: Request, response: Response): void {
  const id = request.params.id;
  const requestedTour = tours.find((tour) => tour.id === +id);

  response.status(200).json({
    status: 'success',
    data: requestedTour,
  });
}

export function updateTour(request: Request, response: Response): void {
  const id = +request.params.id;
  const updatedTour = { id, ...request.body };

  const updatedTours: ITour[] = tours.map((tour) => {
    if (tour.id === id) {
      return updatedTour;
    }
    return tour;
  });

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(updatedTours),
    (error) => {
      if (error) throw error;

      response.status(200).json({
        status: 'success',
        data: updatedTour,
      });
    }
  );
}

export function deleteTour(request: Request, response: Response): void {
  const id = +request.params.id;

  const updatedTours: ITour[] = tours.filter((tour) => tour.id !== id);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(updatedTours),
    (error) => {
      if (error) throw error;

      response.status(204).send();
    }
  );
}
