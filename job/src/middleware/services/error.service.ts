import { Express, Request, Response, NextFunction } from 'express';
import {HandleInstanceError} from '@error/erros.mudule'
export class ErrorMiddlewareService {
  static inicialize(app: Express): void {
    app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
      if (error) {
        console.error(error);
        if (error?.message.includes('multer error')) {
          const message = error.message.split(':')[1];

          const response = {
            status: 404,
            message,
          };
          return res.status(response.status).json(response);
        }

        const response = HandleInstanceError(error);
        return res.status(response.status).json(response);
      }

      next();
    });
  }

}
