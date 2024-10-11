'uset strict';
import jwt from 'jsonwebtoken';
import { IUserDocument } from '../../models/users';
const JWT_SECRET = process.env.JWT_SECRET;
const timeExpires = process.env.TIME_EXPIRES_SESSION || '60h';

// Asegurarte de que la variable JWT_SECRET nunca sea undefined
if (!JWT_SECRET) {
  throw new Error('La variable JWT_SECRET no está definida');
}

/**
 * firmar data con jwt
 * @param user
 * @returns
 */
//user es el objeto del usuario a firmar
export const tokenSing = async (user: IUserDocument) => {
  try {
    //firmar token
    const sign = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      JWT_SECRET,
      {
        expiresIn: timeExpires,
      },
    );
    return sign;
  } catch (error) {
    console.error('error al firmar token: ', error);
    throw error;
  }
};

/**
 * veridicar el JWT
 * @param tokenJwt
 * @returns
 */
//Verificar el token de session
export const verifyToken = async (tokenJwt: string) => {
  try {
    return jwt.verify(tokenJwt, JWT_SECRET);
  } catch (e) {
    //console.error('error  al verificar token: ', e);
    return e;
  }
};

// En tu archivo jwt.ts
export interface TokenData {
  id: string; // O el tipo adecuado para tu identificador de usuario
  role: string; // Otros campos que puedas tener en tu token
  email: string;
}
