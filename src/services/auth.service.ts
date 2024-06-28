import {IResponseLoginData, IResponseUserData, IUserData} from "../types/types";
import {instance} from "../api/axios.api";

export const AuthService = {
    async registration(userData: IUserData): Promise<IResponseUserData | undefined> {
        const {data} = await instance.post<IResponseUserData>('users/create', userData);
        return data;
    },
    async login(userData: IUserData): Promise<IResponseLoginData> {
        const {data} = await instance.post<IResponseLoginData>('auth/login', {
            email: userData.email,
            password: userData.passwordHash
        });
        return data;
    },
    async getMe() {
        const {data} = await instance.get('auth/profile')
        if (data) return data
    },
    async checkRole() {
        const {data} = await instance.get('auth/checkRole')
        if (data) return data
    }
}