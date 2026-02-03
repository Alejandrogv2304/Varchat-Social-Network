import { UserPublicData } from "../dto/user-public-data.dto";
import { User } from "../entities/user.entity";


export interface UserRepository{
    createUser(user:User): Promise<UserPublicData>;
    findByEmail(correo:string): Promise<UserPublicData | null>;
    findByUsername(username:string): Promise<boolean | null>;
    findByEmailForAuth(correo:string): Promise<User | null>;
}