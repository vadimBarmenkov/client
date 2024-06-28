import {instance} from "../api/axios.api";
import {IMessage, ISupportRequest} from "../types/types";

export const MessageService = {

    async findSupportRequests(params: { user: number | null, isActive: boolean }): Promise<ISupportRequest[]> {
        const {data} = await instance.post<any>('', params);
        return data;
    },
    async sendMessage(message: IMessage): Promise<IMessage> {
        const {data} = await instance.post('', message);
        return data;
    },
    async getMessages() {
        const {data} = await instance.get(``);
        return data;
    },
    async closeRequest(id: string) {
        const res = await instance.delete(`/${id}`);
        return res;
    }
}