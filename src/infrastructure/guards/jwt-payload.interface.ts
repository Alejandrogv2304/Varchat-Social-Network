export interface JwtPayload {
  sub: string;
  username:string;
  correo: string;
  nombre: string;
  iat?: number;
  exp?: number;
}
