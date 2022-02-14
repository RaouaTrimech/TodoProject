import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PremierModule } from './premier/premier.module';
import { TodoModule } from './todo/todo.module';
import { TodoServiceService } from './todo-service/todo-service.service';

@Module({
  imports: [PremierModule, TodoModule],
  controllers: [AppController],
  providers: [TodoServiceService],
})
export class AppModule {}
