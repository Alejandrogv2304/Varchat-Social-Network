import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from '../../tokens/tokens';
import type { UserRepository } from '../../../domain/repositories/user.repository';
import { CheckUsernameDto } from 'src/domain/dto/users/check-username.dto';



@Injectable()
export class GetUserByUsername {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(username: string): Promise<CheckUsernameDto> {
      
    const user = await this.userRepository.findByUsername(username);

    if(!user){
        return {
            exists: false,
            available: true
        }
    }

    return {
            exists: true,
            available: false
        }

    }


}
