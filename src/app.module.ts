import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { PremierModule } from './premier/premier.module';
import { TodoModule } from './todo/todo.module';
import { TodoServiceService } from './todo-service/todo-service.service';
import { FirstMiddleware } from './middlewares/firstMiddleware.middlewares';
import { logger } from './middlewares/loggerMiddleware.middlewares';

@Module({
  imports: [PremierModule, TodoModule],
  controllers: [AppController],
  providers: [TodoServiceService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(/*FirstMiddleware, */ logger).forRoutes('*');
  }
}
