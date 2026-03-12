import { IsString, IsOptional, IsEnum } from 'class-validator';
import { UserType } from 'src/domain/entities/user.entity';

export class CreateUserDto {
  @IsString()
  correo: string;

  @IsString()
  username: string;

  @IsString()
  nombre: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsEnum(UserType,{message:'El tipo debe ser público o privado'})
  tipo?: string;
}
