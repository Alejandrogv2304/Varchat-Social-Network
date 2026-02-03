import { Inject, Injectable } from '@nestjs/common';
import { AUTH_REPOSITORY } from '../tokens/tokens';
import type { AuthRepository } from 'src/domain/repositories/auth.repository';
import { UserPublicData } from 'src/domain/dto/user-public-data.dto';
import { LoginResponseDto } from 'src/domain/dto/login-response.dto';


@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly authRepository: AuthRepository,
  ) {}

  async execute(user: UserPublicData): Promise<LoginResponseDto> {
    // Genera el JWT usando el AuthRepository
    return this.authRepository.login(user);
  }
}
