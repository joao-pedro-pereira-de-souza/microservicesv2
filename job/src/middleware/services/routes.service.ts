import { Express } from 'express';
import { UsersRoutes } from '../../welcome/welcome.routes';
export class RoutesMiddlewareService {
  static inicialize(app: Express) {
    UsersRoutes.inicialize(app);
  }
}
