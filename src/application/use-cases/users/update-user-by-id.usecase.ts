import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from '../../tokens/tokens';
import type { UserRepository } from '../../../domain/repositories/user.repository';
import { UserPublicData } from 'src/domain/dto/users/user-public-data.dto';
import { UpdateUserProfileDto } from '../../../interfaces/dtos/updated-user-profile.dto';



@Injectable()
export class UpdatedUserByIdUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(id:string, userData: UpdateUserProfileDto): Promise<UserPublicData> {
 
    const updatedUser = await this.userRepository.updateUserById(id, userData);
    return updatedUser;
  }
}