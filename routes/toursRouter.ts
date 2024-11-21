import express from 'express';
import {
  getTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  topCheapTours,
  // validateIdMiddleware,
  // validateTourMiddleware,
} from '../controllers/toursController';

export const toursRouter = express.Router();

// toursRouter.param('id', validateIdMiddleware);

toursRouter.route('/top5-cheap').get(topCheapTours, getTours);

toursRouter.route('/').get(getTours).post(createTour);
// toursRouter.route('/').get(getTours).post(validateTourMiddleware, createTour);
toursRouter
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  // .patch(validateTourMiddleware, updateTour)
  .delete(deleteTour);
