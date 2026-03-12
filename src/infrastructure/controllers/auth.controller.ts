import { Body, Controller, Post } from '@nestjs/common';
import { LoginUseCase } from 'src/application/use-cases/login.usecase';
import type { LoginDto } from 'src/domain/dto/login/login.dto';
import { ValidateUserUseCase } from '../../application/use-cases/validateUser.usecase';
import { RefreshTokenDto } from 'src/interfaces/dtos/refresh-token.dto';
import { RefreshTokenUseCase } from 'src/application/use-cases/refresh-token.usecase';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly validateUserUseCase: ValidateUserUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase) {}

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

  @Post('/refresh')
 async refresh(@Body() dto: RefreshTokenDto) {
  return this.refreshTokenUseCase.execute(dto.refresh_token);
}
}
