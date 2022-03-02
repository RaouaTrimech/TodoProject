import { NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

export function logger(req: Request, res: Response, next: () => void): any {
  console.log('l`ip est : ' + req.ip);
  console.log('le body est : ');
  console.log(req.body);
  next();
}
