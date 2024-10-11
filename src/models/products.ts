import mongoose, { Model, Document } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

// Definir una interfaz para el esquema del documento
export interface IProductDocument extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  quantity: number;
  imageUrl: string;
  path: string;
  createdAt?: Date;
}

// Crear un tipo personalizado para manejar el método paginate
type PaginateModel<T> = Model<T> & {
  paginate: (query?: unknown, options?: unknown) => Promise<unknown>;
};

// Definir el esquema del producto
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  path: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

// Aplicar el plugin de paginación
productSchema.plugin(mongoosePaginate);

// Crear y exportar el modelo usando el tipo personalizado
const Product: PaginateModel<IProductDocument> = mongoose.model<
  IProductDocument,
  PaginateModel<IProductDocument>
>('Product', productSchema);

export default Product;
