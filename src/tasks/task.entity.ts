import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { TeamMember } from '../teamMembers/teamMembers.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ type: 'date' })
  due_date: string;

  @ManyToOne(() => TeamMember, { onDelete: 'SET NULL' })
  assignee: TeamMember;

  @Column()
  status: string;
}
