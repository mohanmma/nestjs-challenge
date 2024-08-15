import { Module } from '@nestjs/common';
import { TasksService } from './task.service';
import { TasksController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TeamMember } from '../teamMembers/teamMembers.entity';




@Module({
   imports: [
    TypeOrmModule.forFeature([Task, TeamMember]), 
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
