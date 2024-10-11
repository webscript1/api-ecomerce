import mongoose, { Schema, Document, Model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

// Definir la interfaz para el documento del carrito (Cart)
interface ICart extends Document {
  userId: mongoose.Types.ObjectId;
  products: Array<{
    productId: mongoose.Types.ObjectId;
    quantity: number;
  }>;
  createdAt: Date;
}

// Crear un tipo personalizado para manejar el método paginate
type PaginateModel<T> = Model<T> & {
  paginate: (query?: unknown, options?: unknown) => Promise<unknown>;
};

// Definir el esquema del carrito (Cart)
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

// Añadir índices al esquema
cartSchema.index({ userId: 1 }); // Índice en el campo 'userId'
cartSchema.index({ createdAt: 1 }); // Índice en el campo 'createdAt'

// Añadir el plugin de paginación
cartSchema.plugin(mongoosePaginate);

// Crear y exportar el modelo utilizando el tipo personalizado PaginateModel
const Cart: PaginateModel<ICart> = mongoose.model<ICart, PaginateModel<ICart>>(
  'Cart',
  cartSchema,
);

export default Cart;
