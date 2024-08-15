import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamMember } from './teamMembers.entity';
import { Team } from '../team/team.entity';

@Injectable()
export class TeamMembersService {
  constructor(
    @InjectRepository(TeamMember)
    private teamMembersRepository: Repository<TeamMember>,
    @InjectRepository(Team)
    private teamsRepository: Repository<Team>,
  ) {}

  async createTeamMember(name: string, teamId: number): Promise<TeamMember> {
    const team = await this.teamsRepository.findOneBy({ id: teamId });

    if (!team) {
      throw new NotFoundException('Team not found');
    }

    const teamMember = this.teamMembersRepository.create({ name, team });
    return this.teamMembersRepository.save(teamMember);
  }

  async findAll(): Promise<TeamMember[]> {
    return this.teamMembersRepository.find({ relations: ['team'] });
  }

  async findOne(id: number): Promise<TeamMember> {
    const member = await this.teamMembersRepository.findOne({
      where: { id },
      relations: ['team'],
    });

    if (!member) {
      throw new NotFoundException('Team member not found');
    }

    return member;
  }

  async remove(id: number): Promise<void> {
    const result = await this.teamMembersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Team member not found');
    }
  }
}
