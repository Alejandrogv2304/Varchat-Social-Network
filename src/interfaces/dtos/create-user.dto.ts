import { IsString, IsOptional } from 'class-validator';

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

  @IsString()
  tipo: string;
}
