import { ModifiedRequest, IUser } from '../types/types';
import { Response, Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

const users: IUser[] = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`, 'utf-8')
);

export function getUsers(request: ModifiedRequest, response: Response): void {
  console.log(request.requestTime);
  response.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
}

export function createUser(request: Request, response: Response): void {
  function returnRandomId(users: IUser[]): string {
    const newId = uuidv4();
    const foundedMatch = users.find((user) => user._id === newId);
    if (foundedMatch) return returnRandomId(users);
    else return newId;
  }

  if ('role' in request.body && 'email' in request.body) {
    const _id = returnRandomId(users);
    const newUser = { ...request.body, _id };
    users.push(newUser);
    fs.writeFile(
      `${__dirname}/../dev-data/data/users.json`,
      JSON.stringify(users),
      (error) => {
        if (error) throw error;

        response.status(201).json({
          status: 'success',
          data: newUser,
        });
      }
    );
    console.log(newUser);
  } else {
    response.status(500).json({
      status: 'Type error',
    });
  }
}

export function getUser(request: Request, response: Response): void {
  const _id = request.params.id;
  const requestedUser = users.find((user) => user._id === _id);
  if (requestedUser) {
    response.status(200).json({
      status: 'success',
      data: requestedUser,
    });
  } else {
    response.status(404).json({
      status: 'Not found',
    });
  }
}

export function updateUser(request: Request, response: Response): void {
  const _id = request.params.id;
  const requestedUser = users.find((user) => user._id === _id);
  const updatedUser = { _id, ...request.body };
  if (requestedUser && 'role' in request.body && 'email' in request.body) {
    const updatedUsers: IUser[] = users.map((user) => {
      if (user._id === _id) {
        return updatedUser;
      }
      return user;
    });

    fs.writeFile(
      `${__dirname}/../dev-data/data/users.json`,
      JSON.stringify(updatedUsers),
      (error) => {
        if (error) throw error;

        response.status(200).json({
          status: 'success',
          data: updatedUser,
        });
      }
    );
  } else {
    response.status(500).json({ status: 'Request error' });
  }
}

export function deleteUser(request: Request, response: Response): void {
  const _id = request.params.id;
  const requestedUser = users.find((user) => user._id === _id);
  if (requestedUser) {
    const updatedUsers: IUser[] = users.filter((user) => user._id !== _id);
    fs.writeFile(
      `${__dirname}/../dev-data/data/users.json`,
      JSON.stringify(updatedUsers),
      (error) => {
        if (error) throw error;

        response.status(204).send();
      }
    );
  } else {
    response.status(500).json({ status: 'Request error' });
  }
}
