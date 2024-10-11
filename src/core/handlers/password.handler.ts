import bcrypt from 'bcrypt';
/**
 * encryptar password
 * @param {*} passwordPlain
 * @returns
 */
export const encrypt = async (passwordPlain: string) => {
  //encriptar contrase#a
  //passwordPlain: contrase#a aencriptar
  const hast = await bcrypt.hash(passwordPlain, 10);
  return hast;
};

//comprar password con hash

/**
 *
 * @param {*} passwordPlain
 * @param {*} hashPassword
 * @returns
 */
export const compare = async (passwordPlain: string, hashPassword: string) => {
  return await bcrypt.compare(passwordPlain, hashPassword);
};
