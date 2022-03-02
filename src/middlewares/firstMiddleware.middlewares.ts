import { NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
export class FirstMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void): any {
    console.log(req);
    next();
  }
}
