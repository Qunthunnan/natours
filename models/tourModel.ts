import { time } from 'console';
import mongoose, { Query } from 'mongoose';
import { CallbackWithoutResultAndOptionalError, Aggregate } from 'mongoose';
import { skip } from 'node:test';
import { validate } from 'uuid';
import { ITour } from '../types/types';

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      minLength: [3, 'Name of tour must have more or equal to 3 characters'],
      maxLength: [50, 'Name of tour must have less or equal to 50 characters'],
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
      min: [0, 'Minimal average rating must be more or equal to zero'],
      max: [5, 'Maximal average rating must be less or equal to 5'],
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
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (this: ITour, val: Number): boolean {
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) must be less than original price',
      },
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

tourSchema.virtual('durationByWeeks').get(function () {
  return this.duration / 7;
});

tourSchema.pre('save', function (next) {
  this.createdAt = new Date(new Date().getTime() + 7200000);
  next();
});

tourSchema.post('save', function (document, next) {
  console.log(document);
  next();
});

let startTimer = Date.now();

function findPreMiddleware(
  this: Query<typeof Tour, typeof Tour>,
  next: CallbackWithoutResultAndOptionalError,
): void {
  startTimer = Date.now();
  this.find({ secretTour: { $ne: true } });
  next();
}

function findPostMiddleware(
  docs: Query<typeof Tour, typeof Tour>[],
  next: CallbackWithoutResultAndOptionalError,
): void {
  console.log(`Request time: ${Date.now() - startTimer}`);
  next();
}

function aggregatePreMiddleware(
  this: Aggregate<typeof Tour>,
  next: CallbackWithoutResultAndOptionalError,
): void {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
}

tourSchema.pre(/^find/, findPreMiddleware);

tourSchema.post(/^find/, findPostMiddleware);

tourSchema.pre('aggregate', aggregatePreMiddleware);

export const Tour = mongoose.model('Tour', tourSchema);
