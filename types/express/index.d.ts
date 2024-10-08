// /types/express/index.d.ts
import { IUserDocument } from "../../src/models/users"; // Asegúrate de que la ruta es correcta

declare global {
  namespace Express {
    interface Request {
      user?: IUserDocument;
    }
  }
}
