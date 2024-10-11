'use strict';
import * as dotenv from 'dotenv';
dotenv.config();

import app from '../app';
import db from './db';

const port = process.env.PORT || 3703;

app.listen(port, async () => {
  console.log('Servidor escuchando en el puerto: ' + port);

  //conectarse con la base de datos mongodb.
  await db();
});
