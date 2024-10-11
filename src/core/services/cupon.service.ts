import { Request } from 'express';
import Cupon, { ICupon } from '../../models/cupon.model';
import { serviceResult } from '../interfaces/interfaces';
import { NotFoundError } from '../handlers/errorHandler';

export class CuponService {
  constructor() {}

  async createCupon(req: Request) {
    const params: ICupon = req.body;
    const cupon = new Cupon(params);

    const savedCupon = await cupon.save();
    const data: serviceResult = {
      code: 201,
      message: 'Cupón creado',
      data: savedCupon,
    };
    return data;
  }

  async getCupon(req: Request) {
    const cupon = await Cupon.findOne({ codigo: req.params.codigo });

    if (!cupon) {
      throw new NotFoundError('Cupón no encontrado');
    }
    const data: serviceResult = {
      code: 200,
      message: `cupon de ${cupon?.descuento}% aplicado`,
      data: cupon,
    };
    return data;
  }

  async getCupones(req: Request) {
    const { page = 1, limit = 10 } = req.query;
    const options = {
      page: Number(page),
      limit: Number(limit),
    };
    const data: serviceResult = {
      code: 200,
      message: 'Lista de cupones',
    };
    const cupones = await Cupon.paginate({}, options);
    data.data = cupones;
    return data;
  }
  async updateCupon(req: Request) {
    const cupon = await Cupon.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!cupon) {
      throw new NotFoundError('Cupón no encontrado para actualizar');
    }
    const data: serviceResult = {
      code: 200,
      message: 'Cupón actualizado',
      data: cupon,
    };
    return data;
  }
  async deleteCupon(req: Request) {
    const cupon = await Cupon.findByIdAndDelete(req.params.id);
    const data: serviceResult = {
      code: 200,
      message: 'Cupón eliminado',
      data: cupon,
    };
    if (!cupon) {
      throw new NotFoundError('Cupón no encontrado');
    }
    return data;
  }
  async delete_all() {
    const data: serviceResult = {
      code: 200,
      message: 'todos los cupones eliminados',
    };

    const delete_product = await Cupon.deleteMany();

    data.data = delete_product;

    return data;
  }
}
