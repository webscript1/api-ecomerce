import mongoose, { Schema, Document } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

export interface ICupon extends Document {
  codigo: string;
  descuento: number;
  tipoDescuento: string;
  cantidadMinimaCompra: number;
  productosAplicables: [string];
  fechaExpiracion: Date;
  activo: boolean;
  fechaCreacion: Date;
  count: number;
  limit: boolean;
}

const cuponSchema: Schema<ICupon> = new Schema({
  codigo: {
    type: String,
    required: true,
    unique: true,
  },
  descuento: {
    type: Number,
    required: true,
  },
  tipoDescuento: {
    type: String,
    enum: ['porcentaje', 'montoFijo'],
    required: true,
  },
  cantidadMinimaCompra: {
    type: Number,
    default: 0,
  },
  productosAplicables: {
    type: [String], // Array de IDs de productos a los que aplica el cupón
  },
  fechaExpiracion: {
    type: Date,
    required: true,
  },
  activo: {
    type: Boolean,
    default: true,
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
  count: { type: Number, required: false },
  limit: { type: Boolean, default: false },
});

cuponSchema.plugin(mongoosePaginate);

// Definir el modelo utilizando la interfaz extendida
const Cupon = mongoose.model<ICupon>(
  'Cupon',
  cuponSchema,
) as mongoose.PaginateModel<ICupon>;

export default Cupon;
