import { NextFunction, Request, Response } from 'express';
import { CuponService } from '../core/services/cupon.service';

const cuponService = new CuponService();

export const controller_cupon = {
  create: (req: Request, res: Response, next: NextFunction) => {
    cuponService
      .createCupon(req)
      .then(data => {
        return res.status(data.code).send(data);
      })
      .catch(next);
  },

  get: (req: Request, res: Response, next: NextFunction) => {
    cuponService
      .getCupon(req)
      .then(data => {
        return res.status(data.code).send(data);
      })
      .catch(next);
  },

  getAll: (req: Request, res: Response, next: NextFunction) => {
    cuponService
      .getCupones(req)
      .then(data => {
        return res.status(data.code).send(data);
      })
      .catch(next);
  },

  update: (req: Request, res: Response, next: NextFunction) => {
    cuponService
      .updateCupon(req)
      .then(data => {
        return res.status(data.code).send(data);
      })
      .catch(next);
  },

  delete: (req: Request, res: Response, next: NextFunction) => {
    cuponService
      .deleteCupon(req)
      .then(data => {
        return res.status(data.code).send(data);
      })
      .catch(next);
  },

  deleteAll: (req: Request, res: Response, next: NextFunction) => {
    cuponService
      .delete_all()
      .then(data => {
        return res.status(data.code).send(data);
      })
      .catch(next);
  },
};
