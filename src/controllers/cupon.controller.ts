import { NextFunction, Request, Response } from 'express';
import { CuponService } from '../core/services/cupon.service';

const cuponService = new CuponService();

export const controller_cupon = {
  create: (req: Request, res: Response, next: NextFunction) => {
    cuponService
      .createCupon(req, res)
      .then(data => {
        return res.status(data.code).send(data);
      })
      .catch(next);
  },

  get: (req: Request, res: Response, next: NextFunction) => {
    cuponService
      .getCupon(req, res)
      .then(data => {
        return res.status(data.code).send(data);
      })
      .catch(next);
  },

  getAll: (req: Request, res: Response, next: NextFunction) => {
    cuponService
      .getCupones(req, res)
      .then(data => {
        return res.status(data.code).send(data);
      })
      .catch(next);
  },

  update: (req: Request, res: Response, next: NextFunction) => {
    cuponService
      .updateCupon(req, res)
      .then(data => {
        return res.status(data.code).send(data);
      })
      .catch(next);
  },

  delete: (req: Request, res: Response, next: NextFunction) => {
    cuponService
      .deleteCupon(req, res)
      .then(data => {
        return res.status(data.code).send(data);
      })
      .catch(next);
  },

  deleteAll: (req: Request, res: Response, next: NextFunction) => {
    cuponService
      .delete_all(req, res)
      .then(data => {
        return res.status(data.code).send(data);
      })
      .catch(next);
  },
};
