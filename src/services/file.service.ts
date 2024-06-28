import axios from "axios";
import {instance} from "../api/axios.api";
import {getTokenFromLocalStorage} from "../healpers/localstorage.helper";

export const FileService = {
    async uploadImg(formData: FormData): Promise<any> {
        const {data} = await instance.post('file', formData);
        return data;
    },
    async deleteImg(imgName: string) {
        const {data} = await axios.delete(imgName, {
            headers: {
                Authorization: 'Bearer ' + getTokenFromLocalStorage(),
            }
        });
        return data;
    },
}