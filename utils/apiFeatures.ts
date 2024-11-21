import { request } from 'http';
import { Model, Query, QueryOptions } from 'mongoose';

export class ApiFeatures<Model, Interface> {
  query: Query<Model[], Interface>;
  queryString: QueryOptions;
  constructor(query: Query<Model[], Interface>, queryString: QueryOptions) {
    this.query = query;
    this.queryString = queryString;
  }

  filter(): ApiFeatures<Model, Interface> {
    const initialQuery = { ...this.queryString };
    const excludedQueries = ['limit', 'page', 'fields', 'sort'];

    excludedQueries.forEach((exluded) => {
      delete initialQuery[exluded];
    });

    const advancedQuery = JSON.parse(
      JSON.stringify(initialQuery).replace(
        /\b(gte|gt|lte|lt)\b/g,
        (match) => `$${match}`,
      ),
    );

    this.query.find({ advancedQuery });
    return this;
  }

  sort(): ApiFeatures<Model, Interface> {
    if (this.queryString.sort && typeof this.queryString.sort === 'string') {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  select(): ApiFeatures<Model, Interface> {
    if (
      this.queryString.fields &&
      typeof this.queryString.fields === 'string'
    ) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  pagination(): ApiFeatures<Model, Interface> {
    const limit = this.queryString.limit ? +this.queryString.limit : 20;
    const skip = this.queryString.page
      ? (+this.queryString.page - 1) * limit
      : 0;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}
