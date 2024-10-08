import { verifyToken, TokenData } from '../core/utils/jwt';
//import ModelUser from '../models/superTrend';
import { Request, Response, NextFunction } from 'express';
import User from '../models/users';
import { Types } from 'mongoose';

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    //comprobando que halla un token de autorizacion

    if (!req.headers.authorization) {
      return res.status(401).json({ message: 'no autorizado' }); // Enviar una respuesta JSON y luego salir
    }

    const token = req.headers.authorization.split(' ').pop();

    //verificando que el token existe
    if (token) {
      //verificando que el token sea valido
      const dataToken = (await verifyToken(token)) as TokenData;
      // console.log('data token')

      //veridicando que el token tenga la id del usuario
      if (!dataToken.id) {
        return res.status(401).json({ message: 'Session invalid' }); // Enviar una respuesta JSON y luego salir
      }
      //buscando el usuario
      // const objectId: Types.ObjectId = Types.ObjectId.createFromHexString(dataToken.id);

      const user = await User.findById(dataToken.id);

      //sielusuario existe , agregarlo a las respuetas del body
      if (user) {
        // Agregar la propiedad 'user' al objeto req
        req.body.user = user;
        next(); // Llamar a next() para pasar al siguiente middleware o controlador
      } else {
        return res.status(401).json({ message: 'Usuario no encontrado' }); // Enviar una respuesta JSON y luego salir
      }
    }
  } catch (error) {
    console.error('error token session: ', error);
    return res.status(500).json({ message: 'Error interno del servidor' }); // Enviar una respuesta JSON y luego salir
  }
};

export default authMiddleware;
