import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { TeamService } from './team.service';
import { Team } from './team.entity';
import { JwtAuthGuard } from '../auth/auth.guard';

@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}
 
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createTeamDto: Team): Promise<Team> {
    return this.teamService.create(createTeamDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(): Promise<Team[]> {
    return this.teamService.findAll();
  }
}
