import {instance} from "../api/axios.api";
import {IUserData} from "../types/types";

export const UsersService = {
    async create(userData: IUserData): Promise<any | undefined> {
        const {data} = await instance.post<any>('users/create', userData);
        return data;
    },
    async getUserById(id: string | undefined) {
        const {data} = await instance.get(`users/${id}`);
        return data;
    },
    async getUsers(): Promise<any[]> {
        const {data} = await instance.get('users');
        return data;
    },
    async deleteUser(id: string) {
        const res = await instance.delete(`users/${id}`);
        return res;
    }
}