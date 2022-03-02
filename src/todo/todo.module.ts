import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoServiceService } from '../todo-service/todo-service.service';

@Module({
  controllers: [TodoController],
  providers: [TodoServiceService],
})
export class TodoModule {}
