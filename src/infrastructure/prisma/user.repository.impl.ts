import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { User, UserType } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserPublicData } from 'src/domain/dto/user-public-data.dto';


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


async findByUsername(username: string): Promise<boolean | null> {
  const found = await this.prisma.usuario.findUnique({ where: { username } });
  if (!found) return null;
  return true;
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

}
