import { NextFunction, Request, Response, response } from 'express';
import { PaymentService } from '../core/services/payment,.service';
import { serviceResult } from '../core/interfaces/interfaces';

const payment_service = new PaymentService();

export const payment_controller = {
  create: (req: Request, res: Response, next: NextFunction) => {
    payment_service
      .createPayment(req, res)
      .then((data: serviceResult) => {
        return res.status(data.code).send(data);
      })
      .catch(next);
  },
  get: (req: Request, res: Response, next: NextFunction) => {
    payment_service
      .getPayment(req, res)
      .then((data: serviceResult) => {
        return res.status(data.code).send(data);
      })
      .catch(next);
  },
  update: (req: Request, res: Response, next: NextFunction) => {
    payment_service
      .updatePayment(req, res)
      .then((data: serviceResult) => {
        return res.status(data.code).send(data);
      })
      .catch(next);
  },
  delete: (req: Request, res: Response, next: NextFunction) => {
    payment_service
      .deletePayment(req, res)
      .then((data: serviceResult) => {
        return res.status(data.code).send(data);
      })
      .catch(next);
  },
  delete_all: (req: Request, res: Response, next: NextFunction) => {
    payment_service
      .deleteAllPayment(req, res)
      .then((data: serviceResult) => {
        return res.status(data.code).send(data);
      })
      .catch(next);
  },
};
