import mongoose, { Model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Schema = mongoose.Schema;

// Definir una interfaz para el esquema del documento
export interface IProductDocument extends Document {
  // Definir tus campos de documento aquí
  name: string;
  description: string;
  price: number;
  category: string;
  quantity: number;
  imageUrl: string;
  path: string;
  createdAt?: Date;
}

// Definir una interfaz para el modelo de Mongoose con el método paginate
interface IProductsModel extends Model<IProductDocument> {
  paginate(query?: any, options?: any): Promise<any>; // Definir el método paginate
}

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

productSchema.plugin(mongoosePaginate);
// Definición de índices

productSchema.index({ name: 1 }); // Índice en el campo 'symbol'
productSchema.index({ createdAt: 1 }); // Índice en el campo 'date'
productSchema.index({ category: 1 }); // Índice en el campo 'status'
productSchema.index({ price: 1 }); // Índice en el campo 'status'
//productSchema.index({ path: 1 });

const nameCollecction = 'Product';

// Crear y exportar el modelo utilizando la interfaz personalizada
const Product: IProductsModel = mongoose.model<
  IProductDocument,
  IProductsModel
>(nameCollecction, productSchema);

export default Product;
