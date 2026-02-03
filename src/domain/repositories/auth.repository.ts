import { LoginResponseDto } from "../dto/login-response.dto";
import { LoginDto } from "../dto/login.dto";
import { UserPublicData } from "../dto/user-public-data.dto";
import { User } from "../entities/user.entity";


export interface AuthRepository{
    validateUser (loginInfo: LoginDto): Promise<UserPublicData | null>;
    login(user: UserPublicData): Promise<LoginResponseDto>;
}