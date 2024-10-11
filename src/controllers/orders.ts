import { NextFunction, Request, Response } from 'express';
import { OrdersService } from '../core/services/orders';
import { serviceResult } from '../core/interfaces/interfaces';

const user_service = new OrdersService();

export const orders_controller = {
  create: (req: Request, res: Response, next: NextFunction) => {
    user_service
      .createOrder(req)
      .then((data: serviceResult) => {
        return res.status(data.code).send(data);
      })
      .catch(next);
  },
  get: (req: Request, res: Response, next: NextFunction) => {
    user_service
      .getOrder(req)
      .then((data: serviceResult) => {
        return res.status(data.code).send(data);
      })
      .catch(next);
  },
  update: (req: Request, res: Response, next: NextFunction) => {
    user_service
      .updateOrder(req)
      .then((data: serviceResult) => {
        return res.status(data.code).send(data);
      })
      .catch(next);
  },
  delete: (req: Request, res: Response, next: NextFunction) => {
    user_service
      .deleteOrder(req)
      .then((data: serviceResult) => {
        return res.status(data.code).send(data);
      })
      .catch(next);
  },
  get_all: (req: Request, res: Response, next: NextFunction) => {
    user_service
      .getOrders(req)
      .then((data: serviceResult) => {
        return res.status(data.code).send(data);
      })
      .catch(next);
  },
  delete_all: (req: Request, res: Response, next: NextFunction) => {
    user_service
      .deleteAllOrder(req)
      .then((data: serviceResult) => {
        return res.status(data.code).send(data);
      })
      .catch(next);
  },
  detailUserAndOrders: (req: Request, res: Response, next: NextFunction) => {
    user_service
      .detailUserAndOrders(req)
      .then((data: serviceResult) => {
        return res.status(data.code).send(data);
      })
      .catch(next);
  },
};
