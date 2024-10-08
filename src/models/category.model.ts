import mongoose, { Schema, Document, Model } from 'mongoose';

interface ICategory extends Document {
  name: string;
  url: string;
  order: number;
}

const CategorySchema: Schema<ICategory> = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  order: { type: Number, require: false, unique: true },
});

const Category: Model<ICategory> = mongoose.model('Category', CategorySchema);

export default Category;
export { ICategory };
