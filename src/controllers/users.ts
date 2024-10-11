import { NextFunction, Request, Response } from 'express';
import { User_service } from '../core/services/user';
import { serviceResult } from '../core/interfaces/interfaces';

const user_service = new User_service();

export const user_controller = {
  test: (req: Request, res: Response, next: NextFunction) => {
    user_service
      .test()
      .then((data: serviceResult) => {
        return res.status(data.code).send(data);
      })
      .catch(next);
  },
  create: (req: Request, res: Response, next: NextFunction) => {
    user_service
      .create(req)
      .then((data: serviceResult) => {
        return res.status(data.code).send(data);
      })
      .catch(next);
  },
  get: (req: Request, res: Response, next: NextFunction) => {
    user_service
      .get(req)
      .then((data: serviceResult) => {
        return res.status(data.code).send(data);
      })
      .catch(next);
  },
  update: (req: Request, res: Response, next: NextFunction) => {
    user_service
      .update(req)
      .then((data: serviceResult) => {
        return res.status(data.code).send(data);
      })
      .catch(next);
  },
  delete: (req: Request, res: Response, next: NextFunction) => {
    user_service
      .delete(req)
      .then((data: serviceResult) => {
        return res.status(data.code).send(data);
      })
      .catch(next);
  },
  deleteAll: (req: Request, res: Response, next: NextFunction) => {
    user_service
      .deleteAll()
      .then((data: serviceResult) => {
        return res.status(data.code).send(data);
      })
      .catch(next);
  },
  sing_in: (req: Request, res: Response, next: NextFunction) => {
    user_service
      .sing_in(req)
      .then((data: serviceResult) => {
        return res.status(data.code).send(data);
      })
      .catch(next);
  },
};
