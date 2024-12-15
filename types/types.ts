import { Request } from 'express';

export type Dificulty = 'easy' | 'medium' | 'difficult';

export type Role = 'admin' | 'user' | 'guide' | 'lead-guide';

export interface ITour {
  id: Number;
  name: String;
  duration: Number;
  maxGroupSize: Number;
  difficulty: Dificulty;
  summary: String;
  description: String;
  imageCover: String;
  images: String[];
  startDates: String[];
  price: Number;
  priceDiscount: Number;
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
