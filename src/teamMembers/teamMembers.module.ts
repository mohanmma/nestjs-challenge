import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamMembersService } from './teamMembers.service';
import { TeamMembersController } from './teamMembers.controller';
import { TeamMember } from './teamMembers.entity';
import { Team } from '../team/team.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TeamMember, Team])],
  providers: [TeamMembersService],
  controllers: [TeamMembersController],
})
export class TeamMembersModule {}
