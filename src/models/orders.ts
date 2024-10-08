import mongoose, { Schema, Document, Model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { cuponDetail } from '../core/interfaces/cupon.interface';
import { MetodoPago, ProductOrder } from '../core/interfaces/order.interface';

// Definir la interfaz para el documento de Order
export interface IOrder extends Document {
  userId: mongoose.Types.ObjectId;
  products: ProductOrder[];
  metodoPago: MetodoPago;
  totalAmount: number;
  totalConDescuento: number;
  cupon: cuponDetail;
  status: string;
  createdAt: Date;
  numberOrder: number;
  email: string;
}

// Crear un tipo personalizado para manejar el método paginate
type PaginateModel<T> = Model<T> & {
  paginate: (query?: any, options?: any) => Promise<any>;
};

// Definir el esquema de Order
const orderSchema: Schema<IOrder> = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  email: { type: String, required: false },
  products: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      price: {
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
      },
      count: { type: Number, required: true },
    },
  ],
  metodoPago: {
    metodo: { type: String },
    walletReceptora: { type: String },
    walletEmisora: { type: String },
    hash: { type: String },
  },
  totalAmount: { type: Number, required: true },
  totalConDescuento: { type: Number, required: false },
  numberOrder: { type: Number, required: true, unique: true },
  cupon: {
    type: {
      codigo: String,
      descuento: Number,
      count: Number,
      limit: Boolean,
      valid: Boolean,
    },
    required: false,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Crear índices
orderSchema.index({ userId: 1 });
orderSchema.index({ createdAt: 1 });
orderSchema.index({ status: 1 });

// Añadir el plugin de paginación
orderSchema.plugin(mongoosePaginate);

// Crear y exportar el modelo utilizando el tipo personalizado PaginateModel
const Order: PaginateModel<IOrder> = mongoose.model<
  IOrder,
  PaginateModel<IOrder>
>('Order', orderSchema);

export default Order;
