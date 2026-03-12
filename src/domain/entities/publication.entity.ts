import { User} from './user.entity';

export class Publication {
  constructor(
    public id: string,
    public usuarioId: string,
    public contenido: string,
    public createdAt: Date,
    public usuario?: User,

  ) {}
}