import { Request } from 'express';
import Category from '../../models/category.model';
import { serviceResult } from '../interfaces/interfaces';
import { NotFoundError } from '../errors/errorHandler';

export class CategoryService {
  constructor() {}

  async createCategory(req: Request) {
    try {
      const category = new Category(req.body);
      const savedCategory = await category.save();
      const data: serviceResult = {
        code: 201,
        message: 'Categoría creada',
        data: savedCategory,
      };
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getCategory(req: Request) {
    try {
      const category = await Category.findById(req.params.id);

      if (!category) {
        throw new NotFoundError('Categoría no encontrada');
      }
      const data: serviceResult = {
        code: 200,
        message: 'Categoría encontrada',
        data: category,
      };
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getCategories(req: Request) {
    try {
      const categories = await Category.find();
      const data: serviceResult = {
        code: 200,
        message: 'Lista de categorías',
        data: categories,
      };
      return data;
    } catch (error) {
      throw error;
    }
  }

  async updateCategory(req: Request) {
    try {
      const category = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
      );

      if (!category) {
        throw new NotFoundError('Categoría no encontrada para actualizar');
      }
      const data: serviceResult = {
        code: 200,
        message: 'Categoría actualizada',
        data: category,
      };
      return data;
    } catch (error) {
      throw error;
    }
  }

  async deleteCategory(req: Request) {
    try {
      const category = await Category.findByIdAndDelete(req.params.id);
      const data: serviceResult = {
        code: 200,
        message: 'Categoría eliminada',
        data: category,
      };
      if (!category) {
        throw new NotFoundError('Categoría no encontrada para eliminar');
      }
      return data;
    } catch (error) {
      throw error;
    }
  }

  async deleteAllCategories(req: Request) {
    try {
      const deletedCategories = await Category.deleteMany();
      const data: serviceResult = {
        code: 200,
        message: 'Todas las categorías eliminadas',
        data: deletedCategories,
      };

      return data;
    } catch (error) {
      throw error;
    }
  }
}
