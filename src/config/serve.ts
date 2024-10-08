'use strict';
import * as dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import app from '../app';
import db from './db';

const port = process.env.PORT || 3702;

app.listen(port, async () => {
  console.log('Servidor escuchando en el puerto: ' + port);

  //conectarse con la base de datos mongodb.
  await db();
});
