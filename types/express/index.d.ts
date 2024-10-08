// /types/express/index.d.ts
import { IUser } from '../../src/models/user'; // Asegúrate de que la ruta es correcta

declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}
