
import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../../interfaces/dtos/create-user.dto';
import { CreateUserUseCase } from '../../application/use-cases/users/create-user.usecase';
import { UserType } from '../../domain/entities/user.entity';
import { GetUserProfileUseCase } from '../../application/use-cases/users/get-user-profile.usecase';
import { GetUserByUsername } from '../../application/use-cases/users/get-user-by-username';
import { UpdatedUserByIdUseCase } from '../../application/use-cases/users/update-user-by-id.usecase';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { UpdateUserProfileDto } from 'src/interfaces/dtos/updated-user-profile.dto';
import { InactivateUserByIdUseCase } from 'src/application/use-cases/users/inactivate-user-by-id.usecase';


@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserProfileUseCase: GetUserProfileUseCase,
    private readonly getUserByUsername: GetUserByUsername,
    private readonly updatedUserById: UpdatedUserByIdUseCase,
    private readonly inactivateUserById: InactivateUserByIdUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {
    
    return this.createUserUseCase.execute(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getProfileUser(@Param('id') id:string){
    return this.getUserProfileUseCase.execute(id);
  }

  @Get('exists/:username')
  async checkUserExists(@Param('username') username: string) {
    return this.getUserByUsername.execute(username);
  }


  @Patch('')
  @UseGuards(JwtAuthGuard)
  async updatedUserId(@Body() dto: UpdateUserProfileDto, @Request() req){
  const userId = req.user.sub;
  return this.updatedUserById.execute(userId, dto);
  }

  @Patch('/inactivate')
  @UseGuards(JwtAuthGuard)
  async inactivateUser(@Request() req){
  const userId = req.user.sub;
  return this.inactivateUserById.execute(userId);
  }
}
