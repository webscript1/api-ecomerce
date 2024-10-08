import mongoose from 'mongoose';
import Product from '../models/products';
import User from '../models/users';
import Order from '../models/orders';
import Cart from '../models/cars';

const databasePassword = process.env.DATABASEPASSWORD;
const databaseUser = process.env.DATABASEUSER;
const databaseUrl = process.env.URLDATABASE;
const databaseConnectionString = `mongodb+srv://${databaseUser}:${databasePassword}@${databaseUrl}`;

const connectDatabase = async () => {
  try {
    // Deshabilitar la creación automática de índices
    mongoose.set('autoIndex', false);
    mongoose.connection.on('connected', async () => {
      console.log('Connected to the database Mongodb successfully');
    });
    const connectedDatabase = await mongoose.connect(databaseConnectionString);

    try {
      // Crear índices manualmente
      await Product.createIndexes();
      await User.createIndexes();
      await Order.createIndexes();
      await Cart.createIndexes();

      console.log('Índices creados');
    } catch (err) {
      console.error('Error al crear índices', err);
    }

    return connectedDatabase; // Devolverá el valor de connectedDatabase
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error; // Lanza una excepción para que se maneje adecuadamente en otros lugares
  }
};

export default connectDatabase;
