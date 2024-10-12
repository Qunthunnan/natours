import { Request } from 'express';

export type Dificulty = 'easy' | 'medium' | 'difficult';

export type Role = 'admin' | 'user' | 'guide' | 'lead-guide';

export interface ITour {
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

export interface ModifiedRequest extends Request {
  requestTime?: Date;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: Role;
  active: boolean;
  photo: string;
  password: string;
}
