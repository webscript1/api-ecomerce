import mongoose, { Schema, Document, Model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

// Definir la interfaz para el documento de Category
interface ICategory extends Document {
  name: string;
  url: string;
  order: number;
}

// Crear un tipo personalizado para manejar el método paginate
type PaginateModel<T> = Model<T> & {
  paginate: (query?: any, options?: any) => Promise<any>;
};

// Definir el esquema de Category
const CategorySchema: Schema<ICategory> = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  order: { type: Number, required: false, unique: true },
});

// Añadir el plugin de paginación
CategorySchema.plugin(mongoosePaginate);

// Crear y exportar el modelo utilizando el tipo personalizado PaginateModel
const Category: PaginateModel<ICategory> = mongoose.model<
  ICategory,
  PaginateModel<ICategory>
>('Category', CategorySchema);

export default Category;
export { ICategory };
