import {instance} from "../api/axios.api";
import {IHotelData} from "../types/types";

export const HotelService = {
    async create(hotelData: IHotelData): Promise<any | undefined> {
        const {data} = await instance.post<any>('hotels/create', hotelData);
        return data;
    },
    async getHotelById(id: string | undefined) {
        const {data} = await instance.get(`hotels/${id}`);
        return data;
    },
    async getHotels(limit: number, offset: number) {
        const response = await instance.get('hotels', {
            params: {
                limit: limit,
                offset: offset
            }
        });
        return response;
    },
    async deleteHotel(id: string) {
        const res = await instance.delete(`hotels/${id}`);
        return res;
    },
    async updateHotel(id: string | undefined, hotelData: IHotelData): Promise<any | undefined> {
        const {data} = await instance.put<any>(`hotels/${id}`, hotelData);
        return data;
    }
}