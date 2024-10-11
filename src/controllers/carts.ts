import { NextFunction, Request, Response } from 'express';
import { CartService } from '../core/services/cars';
import { serviceResult } from '../core/interfaces/interfaces';

const cart_service = new CartService();

export const cars_controller = {
  create: (req: Request, res: Response, next: NextFunction) => {
    cart_service
      .createCart(req)
      .then((data: serviceResult) => {
        return res.status(data.code).send(data);
      })
      .catch(next);
  },
  get: (req: Request, res: Response, next: NextFunction) => {
    cart_service
      .getCart(req)
      .then((data: serviceResult) => {
        return res.status(data.code).send(data);
      })
      .catch(next);
  },
  update: (req: Request, res: Response, next: NextFunction) => {
    cart_service
      .updateCart(req)
      .then((data: serviceResult) => {
        return res.status(data.code).send(data);
      })
      .catch(next);
  },
  delete: (req: Request, res: Response, next: NextFunction) => {
    cart_service
      .deleteCart(req)
      .then((data: serviceResult) => {
        return res.status(data.code).send(data);
      })
      .catch(next);
  },
  get_all: (req: Request, res: Response, next: NextFunction) => {
    cart_service
      .getCarts(req)
      .then((data: serviceResult) => {
        return res.status(data.code).send(data);
      })
      .catch(next);
  },
  delete_all: (req: Request, res: Response, next: NextFunction) => {
    cart_service
      .deleteAllCarts(req)
      .then((data: serviceResult) => {
        return res.status(data.code).send(data);
      })
      .catch(next);
  },
  updateQtyCart: (req: Request, res: Response, next: NextFunction) => {
    cart_service
      .updateQtyCart(req)
      .then((data: serviceResult) => {
        return res.status(data.code).send(data);
      })
      .catch(next);
  },
  countCart: (req: Request, res: Response, next: NextFunction) => {
    cart_service
      .countOrdersCart(req)
      .then((data: serviceResult) => {
        return res.status(data.code).send(data);
      })
      .catch(next);
  },
};
