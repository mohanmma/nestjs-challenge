import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { TeamMember } from '../teamMembers/teamMembers.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    
    @InjectRepository(TeamMember)
    private teamMembersRepository: Repository<TeamMember>,
  ) {}

 async create(task: Task): Promise<Task> {
  if (task.assignee) {
    const assigneeId = Number(task.assignee);
    const assignee = await this.teamMembersRepository.findOneBy({ id: assigneeId });
    if (!assignee) {
      throw new NotFoundException('Assignee not found');
    }
  }

  return this.tasksRepository.save(task);
}


  async findTasksByAssignee(assigneeId: number): Promise<Task[]> {
  const assignee = await this.teamMembersRepository.findOneBy({ id: assigneeId });

    if (!assignee) {
      throw new NotFoundException('Assignee not found');
    }

    return this.tasksRepository.find({
      where: { assignee: { id: assigneeId } },
      relations: ['assignee', 'assignee.team'],  
    });
  }

  findAll(): Promise<Task[]> {
    return this.tasksRepository.find({ relations: ['assignee', 'assignee.team'] });
  }
  

  async update(id: number, task: Partial<Task>): Promise<{message : string}> {
    if (task.assignee) {
      const assignee = await this.teamMembersRepository.findOne({ where: { id: task.assignee.id } });
      if (!assignee) {
        throw new NotFoundException('Assignee not found');
      }
    }

    await this.tasksRepository.update(id, task);
    return { message: 'Task updated successfully' };
  }
}
