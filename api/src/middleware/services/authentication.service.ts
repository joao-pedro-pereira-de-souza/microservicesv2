import { Request, Response, NextFunction } from 'express';
import { CookieService } from '@security/services/cookie.service';
import { TokenService } from '@security/services/token.service';

export class AuthenticationMiddleware {
  static inicialize() {
    return async (req: Request, res: Response, next: NextFunction) => {
      const instanceCookieService = CookieService.instance(res, req, 'auth');

      let token;
      try {
        token = instanceCookieService.getCookieSigned();
      } catch (error: any) {
        const response = {
          status: 401,
          message: error?.message || 'Token não encontrado.',
        };
        return res.status(response.status).json(response);
      }

      const [bearer, hash] = String(token).split(' ');

      if (!bearer || !hash) {
        const response = {
          status: 401,
          message: 'Token mal formatado.',
        };

        return res.status(response.status).json(response);
      }


      next();
    };
  }

  static getMetadadosToken(req: Request, res: Response) {
    const instanceCookieService = CookieService.instance(res, req, 'auth');

    const token = instanceCookieService.getCookieSigned();
    const [, hash] = String(token).split(' ');
    return TokenService.verify(hash);
  }
}
