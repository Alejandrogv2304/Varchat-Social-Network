import { UserPublicData } from 'src/domain/dto/user-public-data.dto';
import { User, UserType } from '../../domain/entities/user.entity';
import type { UserRepository } from '../../domain/repositories/user.repository';
import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export interface CreateUserInput {
  correo: string;
  username: string;
  nombre: string;
  password:string;
  tipo?: UserType;
  descripcion?: string;
}



@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository
  ) {}

  async execute(input: CreateUserInput): Promise<UserPublicData> {

      // Validar correo
     const existingByEmail = await this.userRepository.findByEmail(input.correo);
     if (existingByEmail) {
     throw new BadRequestException('El correo ya está registrado');
     }
     // Validar username
     const existingByUsername = await this.userRepository.findByUsername(input.username);
     if (existingByUsername) {
     throw new BadRequestException('El username ya está registrado');
     }

    //Encriptación de contraseña
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(input.password, salt);

    const user = new User(
      '', // Este es el id que es uuid
      input.correo,
      input.username,
      input.nombre,
      hash,
      salt,
      input.tipo ?? UserType.PUBLICO,
      input.descripcion,
    );
    return this.userRepository.createUser(user);
  }
}