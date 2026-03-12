import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from 'src/domain/repositories/auth.repository';
import { LoginResponseDto } from 'src/domain/dto/login/login-response.dto';
import { JwtService } from '@nestjs/jwt';
import { UserPublicData } from 'src/domain/dto/users/user-public-data.dto';
import { JwtPayload } from '../guards/jwt-payload.interface';
import type { UserRepository } from 'src/domain/repositories/user.repository';
import { USER_REPOSITORY } from 'src/application/tokens/tokens';

@Injectable()
export class AuthRepositoryImpl implements AuthRepository {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  
  async validateUser(): Promise<UserPublicData | null> {
    throw new Error('Not implementado el ValidateUser');
  }

  async login(user: UserPublicData): Promise<LoginResponseDto> {
    // Payload para el access token
    const payload:JwtPayload = {
      sub: user.id,
      correo: user.correo,
      username: user.username,
      nombre: user.nombre,
    };
    // Generar access token
    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
    });
    // Generar refresh token
    const refresh_token = await this.jwtService.signAsync(
      { sub: user.id },
      { expiresIn: '2d' }
    );
    return {
      access_token,
      refresh_token,
      user,
    };
  }


  async refreshToken(token: string): Promise<{ access_token: string }> {
    // 1. Verificar que el refresh token es válido y no ha expirado
    let payload: { sub: string };
    try {
      payload = await this.jwtService.verifyAsync<{ sub: string }>(token, {
        secret: process.env.JWT_SECRET,
      });
    } catch {
      throw new UnauthorizedException('Refresh token inválido o expirado');
    }

    // 2. Consultar el usuario en la BD para obtener datos siempre actualizados
    const user = await this.userRepository.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    // 3. Generar nuevo access token con datos frescos de la BD
    const newPayload: JwtPayload = {
      sub: user.id,
      correo: user.correo,
      username: user.username,
      nombre: user.nombre,
    };

    const access_token = await this.jwtService.signAsync(newPayload, {
      expiresIn: '15m',
    });

    return { access_token };
  }
}
