export enum UserType {
  PUBLICO = 'publico',
  PRIVADO = 'privado',
}

export class User {
  constructor(
    public readonly id: string,
    public correo: string,
    public username: string,
    public nombre: string,
    public hash: string,
    public salt: string,
    public tipo: UserType = UserType.PUBLICO,
    public descripcion?: string,
    public createdAt?: Date,
    public deletedAt?: Date,
  ) {}
}