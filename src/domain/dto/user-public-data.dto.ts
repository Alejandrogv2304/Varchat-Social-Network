import { UserType } from "../entities/user.entity";

export interface UserPublicData {
  id: string;
  correo: string;
  username: string;
  nombre: string;
  tipo: UserType;
  descripcion?: string ;
}