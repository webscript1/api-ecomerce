import { Request } from 'express';
import { serviceResult } from '../interfaces/interfaces';
import Product, { IProductDocument } from '../../models/products';
import {
  NotFoundError,
  ResourceAlreadyExistsError,
} from '../handlers/errorHandler';

export class ProductService {
  constructor() {}

  async test() {
    const data: serviceResult = {
      code: 200,
      message: 'test products',
    };

    return data;
  }
  async create(req: Request) {
    const data: serviceResult = {
      code: 201,
      message: 'create product success',
    };
    const productsAtributes: IProductDocument = req.body;
    const product = new Product(productsAtributes);
    const pathImage = await Product.findOne({ path: product.path });
    if (pathImage) {
      throw new ResourceAlreadyExistsError(
        `path '${productsAtributes.path}' ya existe, debe ser unico`,
      );
    }

    const save_product = await product.save();
    data.data = save_product;

    return data;
  }
  async get(req: Request) {
    const { id, page = 1, sort = -1, path, limit = 10 } = req.query;

    const data: serviceResult = {
      code: 200,
      message: 'producto',
    };

    // Buscar por ID
    if (id) {
      const order = await Product.findById(id);
      if (!order) {
        throw new NotFoundError('producto no encontrado');
      }
      data.data = order;
      return data;
    }

    // Buscar por path
    if (path) {
      const product = await Product.findOne({ path });
      if (!product) {
        throw new NotFoundError('producto no encontrado');
      }
      data.data = product;
      return data;
    }

    // Opción de paginación
    const options = {
      limit: Number(limit), // Aseguramos que limit sea un número
      page: Number(page), // Aseguramos que page sea un número
      sort: { createdAt: Number(sort) }, // Sort por fecha de creación
    };

    // Paginación de productos
    const products = await Product.paginate({}, options);

    data.data = products;

    return data;
  }
  async update(req: Request) {
    const data: serviceResult = {
      code: 200,
      message: 'producto actualizado',
    };
    const { id } = req.params;
    const proudctUpdate: IProductDocument = req.body;

    if (proudctUpdate.path) {
      const product = await Product.findOne({
        path: proudctUpdate.path,
        _id: { $ne: id }, // Filtra por un _id que sea diferente al valor de id
      });
      if (product) {
        throw new ResourceAlreadyExistsError(
          `el path: ''${proudctUpdate.path}'' ya esta en uso`,
        );
      }
    }
    const update_product = await Product.findByIdAndUpdate(id, proudctUpdate, {
      new: true,
    });

    if (!update_product) {
      throw new NotFoundError(`product ${id}  no encontrado para atualizar`);
    }
    data.data = update_product;

    return data;
  }
  async delete(req: Request) {
    const data: serviceResult = {
      code: 200,
      message: 'producto eliminado',
    };
    const { id } = req.params;

    const delete_product = await Product.findByIdAndDelete(id);

    if (!delete_product) {
      throw new NotFoundError(`product ${id}  no encontrado para eliminar`);
    }
    data.data = delete_product;

    return data;
  }
  async delete_all() {
    const data: serviceResult = {
      code: 200,
      message: 'todos los productos eliminados',
    };

    const delete_product = await Product.deleteMany();

    data.data = delete_product;

    return data;
  }
}
