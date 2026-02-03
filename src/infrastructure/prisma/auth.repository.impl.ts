import { Injectable } from '@nestjs/common';
import { AuthRepository } from 'src/domain/repositories/auth.repository';

import { LoginResponseDto } from 'src/domain/dto/login-response.dto';
import { JwtService } from '@nestjs/jwt';
import { UserPublicData } from 'src/domain/dto/user-public-data.dto';

@Injectable()
export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly jwtService: JwtService) {}

  
  async validateUser(): Promise<UserPublicData | null> {
    throw new Error('Not implementado el ValidateUser');
  }

  async login(user: UserPublicData): Promise<LoginResponseDto> {
    // Payload para el access token
    const payload = {
      id: user.id,
      correo: user.correo,
      username: user.username,
    };
    // Generar access token
    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
    });
    // Generar refresh token
    const refresh_token = await this.jwtService.signAsync(
      { sub: user.id },
      { expiresIn: '7d' }
    );
    return {
      access_token,
      refresh_token,
      user,
    };
  }
}
