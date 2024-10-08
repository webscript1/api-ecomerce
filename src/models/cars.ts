import mongoose, { Schema, Document } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

interface ICart extends Document {
  userId: mongoose.Types.ObjectId;
  products: Array<{
    productId: mongoose.Types.ObjectId;
    quantity: number;
  }>;
  createdAt: Date;
}

const cartSchema: Schema<ICart> = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: { type: Number, default: 1, required: true },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
cartSchema.index({ userId: 1 }); // Índice en el campo 'symbol'
cartSchema.index({ createdAt: 1 }); // Índice en el campo 'date'

// Añadir el plugin de paginación
cartSchema.plugin(mongoosePaginate);

// Definir el modelo utilizando la interfaz extendida
const Cart = mongoose.model<ICart>(
  'Cart',
  cartSchema,
) as mongoose.PaginateModel<ICart>;

export default Cart;
