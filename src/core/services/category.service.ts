import { Request } from 'express';
import Category from '../../models/category.model';
import { serviceResult } from '../interfaces/interfaces';
import { NotFoundError } from '../handlers/errorHandler';

export class CategoryService {
  constructor() {}

  async createCategory(req: Request) {
    const category = new Category(req.body);
    const savedCategory = await category.save();
    const data: serviceResult = {
      code: 201,
      message: 'Categoría creada',
      data: savedCategory,
    };
    return data;
  }

  async getCategory(req: Request) {
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
  }

  async getCategories() {
    const categories = await Category.find();
    const data: serviceResult = {
      code: 200,
      message: 'Lista de categorías',
      data: categories,
    };
    return data;
  }

  async updateCategory(req: Request) {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!category) {
      throw new NotFoundError('Categoría no encontrada para actualizar');
    }
    const data: serviceResult = {
      code: 200,
      message: 'Categoría actualizada',
      data: category,
    };
    return data;
  }

  async deleteCategory(req: Request) {
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
  }

  async deleteAllCategories() {
    const deletedCategories = await Category.deleteMany();
    const data: serviceResult = {
      code: 200,
      message: 'Todas las categorías eliminadas',
      data: deletedCategories,
    };

    return data;
  }
}
