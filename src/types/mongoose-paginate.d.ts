import { Document, Model } from 'mongoose';

declare module 'mongoose' {
  interface PaginateModel<T extends Document> extends Model<T> {
    paginate(query?: any, options?: any, callback?: (err: any, result: any) => void): Promise<any>;
  }
}