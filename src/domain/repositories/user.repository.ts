import { UpdateUserProfileDto } from "src/interfaces/dtos/updated-user-profile.dto";
import { CheckUsernameDto } from "../dto/users/check-username.dto";
import { UserPublicData } from "../dto/users/user-public-data.dto";
import { User } from "../entities/user.entity";


export interface UserRepository{
    createUser(user:User): Promise<UserPublicData>;
    findByEmail(correo:string): Promise<UserPublicData | null>;
    findByUsername(username:string): Promise<CheckUsernameDto>;
    findByEmailForAuth(correo:string): Promise<User | null>;
    findById(id:string):Promise<UserPublicData | null>;
    updateUserById(id:string, userData: UpdateUserProfileDto): Promise<UserPublicData>;
    inactivateUserById(id:string): Promise<{message:string}>;

}