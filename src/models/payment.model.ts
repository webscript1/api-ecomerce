import mongoose, { Schema, Document, Model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { IProductDocument } from './products';

export interface IPaymentDcocument extends Document {
  name: string;
  wallet: string;
  crypto: string;
  image: string;
  template: string;
  red: string;
}
// Definir una interfaz para el modelo de Mongoose con el método paginate
interface IPaymentModel extends Model<IPaymentDcocument> {
  paginate(query?: any, options?: any): Promise<any>; // Definir el método paginate
}
const paymentSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  wallet: {
    type: String,
    required: true,
    trim: true,
  },
  crypto: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
    trim: true,
  },
  template: {
    type: String,
    required: true,
    trim: true,
  },
  red: {
    type: String,
    required: true,
    trim: true,
  },
});
paymentSchema.plugin(mongoosePaginate);

// Crear y exportar el modelo utilizando la interfaz personalizada
const Payment: IPaymentModel = mongoose.model<IProductDocument, IPaymentModel>(
  'Payment',
  paymentSchema,
);

export default Payment;
