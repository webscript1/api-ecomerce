import { Request } from 'express';

import Payment, { IPaymentDocument } from '../../models/payment.model';
import { NotFoundError } from '../handlers/errorHandler';
import { serviceResult } from '../interfaces/interfaces';

export class PaymentService {
  constructor() {}

  async createPayment(req: Request): Promise<serviceResult> {
    const params: IPaymentDocument = req.body;

    const newModel = new Payment(params);

    await newModel.save();

    // Devolver el resultado exitoso
    const data: serviceResult = {
      code: 201, // Código HTTP 201: Recurso creado
      message: 'Payment creado exitosamente',
      data: newModel,
    };

    return data;
  }

  async getPayment(req: Request): Promise<serviceResult> {
    const data: serviceResult = {
      code: 200,
      message: 'Modelo encontrado',
    };
    const { id, page = 1, sort = -1, limit = 10 } = req.query;

    if (id) {
      const payment = await Payment.findById(id);
      if (!payment) {
        throw new NotFoundError('payment no encontrado');
      }
      data.data = payment;
      return data;
    }
    // Opción de paginación
    const options = {
      limit: Number(limit), // Aseguramos que limit sea un número
      page: Number(page), // Aseguramos que page sea un número
      sort: { createdAt: Number(sort) }, // Sort por fecha de creación
    };

    // Paginación de productos
    const payment = await Payment.paginate({}, options);
    data.data = payment;

    return data;
  }

  async updatePayment(req: Request): Promise<serviceResult> {
    const paramsUpdate: IPaymentDocument = req.body;

    // Actualizar el Payment
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      paramsUpdate,
      {
        new: true, // Retorna el nuevo documento actualizado
      },
    );
    if (!payment) {
      throw new NotFoundError('Payment no encontrado para actualizar');
    }

    // Devolver la respuesta solo si se actualizó correctamente
    const data: serviceResult = {
      code: 200,
      message: 'Payment actualizado',
      data: payment,
    };

    return data;
  }

  async deletePayment(req: Request): Promise<serviceResult> {
    const payment = await Payment.findByIdAndDelete(req.params.id);
    if (!payment) {
      throw new NotFoundError('Payment no encontrado para eliminar');
    }

    const data: serviceResult = {
      code: 200,
      message: 'Payment eliminado eliminado',
      data: payment,
    };

    return data;
  }

  async deleteAllPayment(): Promise<serviceResult> {
    const paymentDeleted = await Payment.deleteMany();

    const data: serviceResult = {
      code: 200,
      message: 'Todos los modelos eliminados',
      data: paymentDeleted,
    };

    return data;
  }
}
