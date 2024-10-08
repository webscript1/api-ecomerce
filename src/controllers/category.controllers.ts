import { NextFunction, Request, Response } from 'express';
import { CategoryService } from '../core/services/category.service';

const categoryService = new CategoryService();

export const controller_category = {
  create: (req: Request, res: Response, next: NextFunction) => {
    categoryService
      .createCategory(req)
      .then(data => {
        return res.status(data.code).send(data);
      })
      .catch(next);
  },

  get: (req: Request, res: Response, next: NextFunction) => {
    categoryService
      .getCategory(req)
      .then(data => {
        return res.status(data.code).send(data);
      })
      .catch(next);
  },

  getAll: (req: Request, res: Response, next: NextFunction) => {
    categoryService
      .getCategories(req)
      .then(data => {
        return res.status(data.code).send(data);
      })
      .catch(next);
  },

  update: (req: Request, res: Response, next: NextFunction) => {
    categoryService
      .updateCategory(req)
      .then(data => {
        return res.status(data.code).send(data);
      })
      .catch(next);
  },

  delete: (req: Request, res: Response, next: NextFunction) => {
    categoryService
      .deleteCategory(req)
      .then(data => {
        return res.status(data.code).send(data);
      })
      .catch(next);
  },

  deleteAll: (req: Request, res: Response, next: NextFunction) => {
    categoryService
      .deleteAllCategories(req)
      .then(data => {
        return res.status(data.code).send(data);
      })
      .catch(next);
  },
};
