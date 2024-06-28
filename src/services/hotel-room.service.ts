import {instance} from "../api/axios.api";
import {IHotelRoomData} from "../types/types";

export const HotelRoomService = {
    async create(hotelRoomData: IHotelRoomData): Promise<any | undefined> {
        console.log('data', hotelRoomData);
        const {data} = await instance.post<any>('hotel-rooms/create', hotelRoomData);
        return data;
    },
    async getById(id: string | undefined) {
        const {data} = await instance.get(`hotel-rooms/${id}`);
        return data;
    },
    async getHotelRooms(hotelId: string | undefined): Promise<any[]> {
        const {data} = await instance.get(`hotel-rooms/hotels/${hotelId}`);
        return data;
    }

}