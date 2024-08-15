import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { TasksService } from './task.service';
import { Task } from './task.entity';
import { JwtAuthGuard } from '../auth/auth.guard';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createTaskDto: Task): Promise<Task> {
    return this.tasksService.create(createTaskDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('assignee/:id')
  getTasksByAssignee(@Param('id') id: number): Promise<Task[]> {
    return this.tasksService.findTasksByAssignee(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() updateTaskDto: Partial<Task>): Promise<{message: string}> {
    return this.tasksService.update(id, updateTaskDto);
  }
}
