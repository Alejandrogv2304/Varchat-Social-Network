import { IsString, IsOptional, MaxLength, IsEmail, IsEnum } from 'class-validator';
import { UserType } from 'src/domain/entities/user.entity';

export class UpdateUserProfileDto {
  @IsOptional()
  @IsEmail()
  correo?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  username?: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  nombre?: string;

  @IsOptional()
  @IsString()
  @MaxLength(280)
  descripcion?: string;

  @IsOptional()
  @IsEnum(UserType,{message:'El tipo debe ser público o privado'})
  tipo?: string; 
}