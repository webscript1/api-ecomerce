import mongoose, { Schema, Document } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { cuponDetail } from '../core/interfaces/cupon.interface';
import { MetodoPago, ProductOrder } from '../core/interfaces/order.interface';

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

const orderSchema: Schema<IOrder> = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  email: { type: String, require: false },
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
      count: { type: Number, require: true },
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
orderSchema.index({ userId: 1 }); // Índice en el campo 'symbol'
orderSchema.index({ createdAt: 1 }); // Índice en el campo 'date'
orderSchema.index({ status: 1 }); // Índice en el campo 'status'
//orderSchema.index({ totalAmount: 1 }); // Índice en el campo 'status'
//orderSchema.index({ numberOrder: 1 }); // Índice en el campo 'status'

// Añadir el plugin de paginación
orderSchema.plugin(mongoosePaginate);

// Definir el modelo utilizando la interfaz extendida
const Order = mongoose.model<IOrder>(
  'Order',
  orderSchema,
) as mongoose.PaginateModel<IOrder>;

export default Order;
