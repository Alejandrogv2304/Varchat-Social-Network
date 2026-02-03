import { BadRequestException, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { USER_REPOSITORY } from "../tokens/tokens";
import type { UserRepository } from "src/domain/repositories/user.repository";
import { LoginDto } from "src/domain/dto/login.dto";
import * as bcrypt from 'bcrypt';
import { UserPublicData } from "src/domain/dto/user-public-data.dto";


@Injectable()
export class ValidateUserUseCase{

     constructor(@Inject(USER_REPOSITORY) private readonly userRepository: UserRepository) {}
    
      async execute(input: LoginDto): Promise<UserPublicData> {
    
        const { correo, password } = input;
         const existingUser = await this.userRepository.findByEmailForAuth(correo);
         if (!existingUser) {
         throw new UnauthorizedException('Credenciales Invalidas');
         }
         if(existingUser.deletedAt !== null && existingUser.deletedAt !== undefined){
         throw new UnauthorizedException('Credenciales Invalidas');
         }
         
        
        //Verificacion de contraseña
         const isPasswordValid = await bcrypt.compare(password, existingUser.hash);
         if (!isPasswordValid) {
         throw new UnauthorizedException('Credenciales inválidas');
         }

        return existingUser;
      }
}