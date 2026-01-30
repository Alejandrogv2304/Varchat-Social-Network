
import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../../interfaces/dtos/create-user.dto';
import { CreateUserUseCase } from '../../application/use-cases/create-user.usecase';
import { UserType } from '../../domain/entities/user.entity';


@Controller('users')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

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
}
