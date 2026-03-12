import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from '../../tokens/tokens';
import type { UserRepository } from '../../../domain/repositories/user.repository';
import { UserPublicData } from 'src/domain/dto/users/user-public-data.dto';
import { UpdateUserProfileDto } from '../../../interfaces/dtos/updated-user-profile.dto';



@Injectable()
export class InactivateUserByIdUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

    async execute(id:string): Promise<{message:string}> {
    const result = await this.userRepository.inactivateUserById(id);
    return result;
    }
}