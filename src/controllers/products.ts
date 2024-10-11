import { NextFunction, Request, Response } from 'express';
import { ProductService } from '../core/services/products';

const produtcs = new ProductService();

export const controller_product = {
  test: (req: Request, res: Response, next: NextFunction) => {
    produtcs
      .test()
      .then(data => {
        return res.status(data.code).send(data);
      })
      .catch(next);
  },
  create: (req: Request, res: Response, next: NextFunction) => {
    produtcs
      .create(req)
      .then(data => {
        return res.status(data.code).send(data);
      })
      .catch(next);
  },
  get: (req: Request, res: Response, next: NextFunction) => {
    produtcs
      .get(req)
      .then(data => {
        return res.status(data.code).send(data);
      })
      .catch(next);
  },

  update: (req: Request, res: Response, next: NextFunction) => {
    produtcs
      .update(req)
      .then(data => {
        return res.status(data.code).send(data);
      })
      .catch(next);
  },
  delete: (req: Request, res: Response, next: NextFunction) => {
    produtcs
      .delete(req)
      .then(data => {
        return res.status(data.code).send(data);
      })
      .catch(next);
  },
  delete_all: (req: Request, res: Response, next: NextFunction) => {
    produtcs
      .delete_all()
      .then(data => {
        return res.status(data.code).send(data);
      })
      .catch(next);
  },
};
