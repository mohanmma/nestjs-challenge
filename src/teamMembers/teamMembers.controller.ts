import { Controller, Get, Post, Body, Param, Delete, UseGuards} from '@nestjs/common';
import { TeamMembersService } from './teamMembers.service';
import { TeamMember } from './teamMembers.entity';
import { JwtAuthGuard } from '../auth/auth.guard';


@Controller('teamMembers')
export class TeamMembersController {
  constructor(private readonly teamMembersService: TeamMembersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createTeamMemberDto: { name: string; teamId: number }): Promise<TeamMember> {
    const { name, teamId } = createTeamMemberDto;
    return this.teamMembersService.createTeamMember(name, teamId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<TeamMember[]> {
    return this.teamMembersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<TeamMember> {
    return this.teamMembersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.teamMembersService.remove(id);
  }
}
