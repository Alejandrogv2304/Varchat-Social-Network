import { Inject, Injectable } from "@nestjs/common";
import { AUTH_REPOSITORY } from "../tokens/tokens";
import type { AuthRepository } from "src/domain/repositories/auth.repository";

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly authRepository: AuthRepository,
  ) {}

  async execute(token: string): Promise<{ access_token: string }> {
    return this.authRepository.refreshToken(token);
  }
}