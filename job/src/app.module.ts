import express, { Express } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { Server } from 'http';

import { RoutesMiddlewareService } from '@middleware/services/routes.service';

import { RateLimitedMiddlewareService } from '@middleware/services/ratelimit.service';
import { ErrorMiddlewareService } from "@root/src/middleware/services/error.service";

export class AppServer {
  constructor(public readonly app: Express) {}

  static getInstance() {
    const app = express();

    app.use(express.json());

    app.use(
      cors({
        credentials: true,
        allowedHeaders: ['content-type'],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
        origin: true,
      })
    );

    app.use(cookieParser(process.env.SIGNATURE_COOKIE));

    if (
      !RateLimitedMiddlewareService.unlimitedEnvironments.includes(
        String(process.env.NODE_ENV)
      )
    ) {
      RateLimitedMiddlewareService.inicialize(app);
    }

    RoutesMiddlewareService.inicialize(app);
    ErrorMiddlewareService.inicialize(app);

    return new AppServer(app);
  }

  #listenerCallback() {
    console.log('Server listening on ✅');
  }

  inicialize(): Server | void {
    if (process.env.NODE_ENV !== 'test') {
      return this.app.listen(process.env.PORT || 3132, () =>
        this.#listenerCallback()
      );
    }
  }
}
