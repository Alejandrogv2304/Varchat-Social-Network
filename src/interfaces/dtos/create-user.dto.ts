export class CreateUserDto {
  correo: string;
  username: string;
  nombre: string;
  password: string;
  descripcion?: string;
  tipo: string;
}
