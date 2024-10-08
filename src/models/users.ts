import mongoose, { CallbackError, Document, Model, Schema } from 'mongoose';
import { encrypt, compare } from '../core/utils/password';
import mongoosePaginate from 'mongoose-paginate-v2';

// Definir una interfaz para el esquema del documento
interface IUserDocument extends Document {
  // Definir tus campos de documento aquí
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  role: 'user' | 'admin';
  createdAt: Date;
  comparePassword(password: string): Promise<boolean>;
}

// Definir una interfaz para el modelo de Mongoose con el método paginate
interface IUserModel extends Model<IUserDocument> {
  paginate(query?: any, options?: any): Promise<any>; // Definir el método paginate
}

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  role: 'user' | 'admin';
  createdAt: Date;
  comparePassword(password: string): Promise<boolean>;
}

const userSchema: Schema<IUser> = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'is invalid'],
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
userSchema.index({ email: 1 }, { unique: true }); // Índice en el campo 'symbol'
userSchema.index({ createdAt: 1 }); // Índice en el campo 'date'
// Índice en el campo 'status'

// Middleware para encriptar la contraseña antes de guardarla
userSchema.pre<IUser>('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    try {
      this.password = await encrypt(this.password);
      next();
    } catch (error) {
      // Aseguramos que TypeScript entienda que `error` es del tipo correcto
      next(error as CallbackError | undefined);
    }
  } else {
    return next();
  }
});

// Método para comparar la contraseña ingresada con la almacenada en la base de datos
userSchema.methods.comparePassword = async function (
  password: string,
): Promise<boolean> {
  return await compare(password, this.password);
};
userSchema.plugin(mongoosePaginate);

const nameCollecction = 'User';

// Crear y exportar el modelo utilizando la interfaz personalizada
const User: IUserModel = mongoose.model<IUserDocument, IUserModel>(
  nameCollecction,
  userSchema,
);

export default User;
