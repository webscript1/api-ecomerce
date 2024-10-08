import mongoose from 'mongoose';
import { cuponDetail } from './cupon.interface';

export interface Orders {
  userId: string;
  products: ProductOrder[];
  metodoPago: MetodoPago;
  totalAmount: number;
  totalConDescuento: number;
  cupon: cuponDetail;
  status: string;
}

export interface MetodoPago {
  metodo: string;
  walletReceptora: string;
  walletEmisora: string;
  hash: string;
}
export interface ProductOrder {
  id: String;
  name: String;
  price: Number;
  count: Number;
  imageUrl: String;
  path: String;
}
