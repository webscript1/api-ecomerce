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
  id: string;
  name: string;
  price: number;
  count: number;
  imageUrl: string;
  path: string;
}
