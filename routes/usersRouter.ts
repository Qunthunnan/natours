import express from 'express';
import {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from '../controllers/usersController';

export const usersRouter = express.Router();

usersRouter.route('/').get(getUsers).post(createUser);
usersRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);
