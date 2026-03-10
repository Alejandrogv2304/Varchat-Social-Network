import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { User, UserType } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserPublicData } from 'src/domain/dto/users/user-public-data.dto';
import { CheckUsernameDto } from 'src/domain/dto/users/check-username.dto';
import { UpdateUserProfileDto } from 'src/interfaces/dtos/updated-user-profile.dto';


@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(user: User): Promise<UserPublicData> {
    const created = await this.prisma.usuario.create({
      data: {
        correo: user.correo,
        username: user.username,
        nombre: user.nombre,
        hash: user.hash,
        salt: user.salt,
        tipo: user.tipo,
        descripcion: user.descripcion ,
      },
    });
    return {
      id: created.id,
      correo: created.correo,
      username: created.username,
      nombre: created.nombre,
      tipo: created.tipo as UserType,
      descripcion: created.descripcion ?? undefined
    };
  }
  
  async findByEmail(email: string): Promise<UserPublicData | null> {
  const found = await this.prisma.usuario.findUnique({ where: { correo: email } });
  if (!found) return null;
  return {
    id: found.id,
    correo: found.correo,
    username: found.username,
    nombre: found.nombre,
    tipo: found.tipo as UserType,
    descripcion: found.descripcion ?? undefined
  }
}


async findByUsername(username: string): Promise<CheckUsernameDto> {
  const found = await this.prisma.usuario.findUnique({ where: { username } });
  if (!found) {
    return{
      exists: false,
      available: true
    }
  }
  return {
    exists: true,
    available: false
  };
}


 async findByEmailForAuth(email: string): Promise<User | null> {
  const found = await this.prisma.usuario.findUnique({ where: { correo: email } });
  if (!found) return null;
  return {
    id: found.id,
    correo: found.correo,
    username: found.username,
    nombre: found.nombre,
    tipo: found.tipo as UserType,
    descripcion: found.descripcion ?? undefined,
    hash: found.hash,
    salt: found.salt
  }
}

async findById(id:string): Promise<UserPublicData | null>{
  const found = await this.prisma.usuario.findUnique({ where:{id: id}})
  if(!found) return null;
  return {
    id: found.id,
    correo: found.correo,
    username: found.username,
    nombre: found.nombre,
    tipo: found.tipo as UserType,
    descripcion: found.descripcion ?? undefined
  }
}




async updateUserById(id: string, userData: UpdateUserProfileDto ): Promise<UserPublicData> {
  const found = await this.prisma.usuario.findUnique({ where: { id } });
  if (!found) throw new NotFoundException('Usuario no encontrado');

  // Filtrar campos permitidos
  const allowedFields = ['nombre', 'descripcion', 'tipo', 'username', 'correo'];
  const dataToUpdate: any = {};
  for (const key of allowedFields) {
    if (userData[key] !== undefined) dataToUpdate[key] = userData[key];
  }

  // Validar username
  if (dataToUpdate.username) {
    const usernameExists = await this.prisma.usuario.findUnique({ where: { username: dataToUpdate.username } });
    if (usernameExists && usernameExists.id !== id) throw new ConflictException('El nombre de usuario ya está en uso');
  }

  // Validar correo
  if (dataToUpdate.correo) {
    const emailExists = await this.prisma.usuario.findUnique({ where: { correo: dataToUpdate.correo } });
    if (emailExists && emailExists.id !== id) throw new ConflictException('El correo electrónico ya está en uso');
  }

  const updated = await this.prisma.usuario.update({
    where: { id },
    data: dataToUpdate
  });

  return {
    id: updated.id,
    correo: updated.correo,
    username: updated.username,
    nombre: updated.nombre,
    tipo: updated.tipo as UserType,
    descripcion: updated.descripcion ?? undefined
  };
}
}
