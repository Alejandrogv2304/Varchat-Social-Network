import { UserPublicData } from "./user-public-data.dto";

export interface LoginResponseDto {
    access_token:string;
    refresh_token:string;
    user: UserPublicData;
}