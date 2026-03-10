import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { USER_REPOSITORY } from '../../tokens/tokens';
import type { UserRepository } from '../../../domain/repositories/user.repository';
import type { UserPublicData } from '../../../domain/dto/users/user-public-data.dto';


@Injectable()
export class GetUserProfileUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(userId: string): Promise<UserPublicData> {
      
    const user = await this.userRepository.findById(userId);

    if(!user){
        throw new NotFoundException('Usuario no encontrado')
    }

    return{
        id:user.id,
        correo: user.correo,
        username:user.username,
        nombre:user.nombre,
        tipo:user.tipo,
        descripcion:user.descripcion    
    }
    }


}