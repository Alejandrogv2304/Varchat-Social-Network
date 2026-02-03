import { Body, Controller, Post } from '@nestjs/common';
import { LoginUseCase } from 'src/application/use-cases/login.usecase';
import type { LoginDto } from 'src/domain/dto/login.dto';
import { ValidateUserUseCase } from '../../application/use-cases/validateUser.usecase';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly validateUserUseCase: ValidateUserUseCase) {}

  @Post('/login')
  async login(@Body() dto: LoginDto) {

    const user = await this.validateUserUseCase.execute(dto);
    // Transformar User a UserPublicData
    const userPublicData = {
      id: user.id,
      correo: user.correo,
      username: user.username,
      nombre: user.nombre,
      tipo: user.tipo,
      descripcion: user.descripcion,
    };
    return this.loginUseCase.execute(userPublicData);
  }
}
