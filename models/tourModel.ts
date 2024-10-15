import mongoose from 'mongoose';

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'Group size is required'],
  },
  difficulty: {
    type: String,
    required: [true, 'Difficulty is required'],
    trim: true,
  },
  ratingsAverage: {
    type: Number,
    default: 0,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  summary: {
    type: String,
    required: [true, 'Summary is required'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'Image cover is required'],
    trim: true,
  },
  images: {
    type: [String],
    required: [true, 'Images is required'],
    trim: true,
  },
  startDates: {
    type: [Date],
    required: [true, 'Start dates is required'],
  },
  priceDiscount: Number,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const Tour = mongoose.model('Tour', tourSchema);
