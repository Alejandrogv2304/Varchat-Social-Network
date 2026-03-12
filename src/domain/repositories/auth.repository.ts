import { LoginResponseDto } from "../dto/login/login-response.dto";
import { LoginDto } from "../dto/login/login.dto";
import { UserPublicData } from "../dto/users/user-public-data.dto";
import { User } from "../entities/user.entity";


export interface AuthRepository{
    validateUser (loginInfo: LoginDto): Promise<UserPublicData | null>;
    login(user: UserPublicData): Promise<LoginResponseDto>;
    refreshToken(token:string): Promise<{access_token:string}>;
}