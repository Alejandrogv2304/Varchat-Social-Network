
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from '../../interfaces/dtos/create-user.dto';
import { CreateUserUseCase } from '../../application/use-cases/create-user.usecase';
import { UserType } from '../../domain/entities/user.entity';
import { GetUserProfileUseCase } from '../../application/use-cases/get-user-profile.usecase';


@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserProfileUseCase: GetUserProfileUseCase
  ) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {
    
    return this.createUserUseCase.execute({
      correo: dto.correo,
      username: dto.username,
      nombre: dto.nombre,
      password: dto.password,
      tipo: dto.tipo ? (dto.tipo as UserType) : UserType.PUBLICO,
      descripcion: dto.descripcion,
    });
  }

  @Get(':id')
  async getProfileUser(@Param('id') id:string){
    return this.getUserProfileUseCase.execute(id);
  }
}
