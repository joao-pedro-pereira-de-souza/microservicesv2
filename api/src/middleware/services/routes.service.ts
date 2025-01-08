import { Express } from 'express';
import { WelcomeRoutes } from '@src/welcome/welcome.routes';
import { TemplateRoutes } from "@src/template/template.routes";
export class RoutesMiddlewareService {
  static inicialize(app: Express) {
    WelcomeRoutes.inicialize(app);
    TemplateRoutes.inicialize(app);
  }
}
