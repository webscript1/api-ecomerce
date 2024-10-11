import mongoose, { Schema, Document, Model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

// Definir la interfaz para el documento de Payment
export interface IPaymentDocument extends Document {
  name: string;
  wallet: string;
  crypto: string;
  image: string;
  template: string;
  red: string;
}

// Crear un tipo personalizado para manejar el método paginate
type PaginateModel<T> = Model<T> & {
  paginate: (query?: unknown, options?: unknown) => Promise<unknown>;
};

// Definir el esquema de Payment
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

// Aplicar el plugin de paginación
paymentSchema.plugin(mongoosePaginate);

// Crear y exportar el modelo utilizando el tipo personalizado PaginateModel
const Payment: PaginateModel<IPaymentDocument> = mongoose.model<
  IPaymentDocument,
  PaginateModel<IPaymentDocument>
>('Payment', paymentSchema);

export default Payment;
