import mongoose, { CallbackError, Document, Model, Schema } from 'mongoose';
import { encrypt, compare } from '../core/handlers/password.handler';
import mongoosePaginate from 'mongoose-paginate-v2';

// Definir una interfaz para el esquema del documentoe
export interface IUserDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  role: 'user' | 'admin';
  createdAt: Date;
}

// Definir una interfaz para el modelo de Mongoose con el método paginate
interface IUserModel extends Model<IUserDocument> {
  paginate(query?: unknown, options?: unknown): Promise<unknown>; // Definir el método paginate
}

const userSchema: Schema<IUserDocument> = new Schema({
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

userSchema.index({ email: 1 }, { unique: true }); // Índice en el campo 'email'
userSchema.index({ createdAt: 1 }); // Índice en el campo 'createdAt'

// Middleware para encriptar la contraseña antes de guardarla
userSchema.pre<IUserDocument>('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    try {
      this.password = await encrypt(this.password);
      next();
    } catch (error) {
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

// Añadir el plugin de paginación
userSchema.plugin(mongoosePaginate);

const nameCollection = 'User';

// Crear y exportar el modelo utilizando la interfaz personalizada
const User: IUserModel = mongoose.model<IUserDocument, IUserModel>(
  nameCollection,
  userSchema,
);

export default User;
