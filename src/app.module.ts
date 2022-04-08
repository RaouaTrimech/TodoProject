import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { PremierModule } from './premier/premier.module';
import { TodoModule } from './todo/todo.module';
import { ConfigModule } from '@nestjs/config';
import { devConfig } from './config/dev.config';
import { prodConfig } from './config/prod.config';
import { TodoServiceService } from './todo-service/todo-service.service';
import { FirstMiddleware } from './middlewares/firstMiddleware.middlewares';
import { logger } from './middlewares/loggerMiddleware.middlewares';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    PremierModule,
    TodoModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [process.env.NODE_ENV == 'development' ? devConfig : prodConfig],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'protocol_web',
      autoLoadEntities: true,
      synchronize: true,
      debug: true,
    }),
  ],
  controllers: [AppController],
  providers: [TodoServiceService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(/*FirstMiddleware, */ logger).forRoutes('*');
  }
}
