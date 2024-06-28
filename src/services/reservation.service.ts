import {instance} from "../api/axios.api";
import {IReservationData} from "../types/types";

export const ResevationService = {

    async create(reservationData: IReservationData): Promise<any | undefined> {
        const {data} = await instance.post<any>('reservations', reservationData);
        return data;
    },
    async getUserReservations() {
        const {data} = await instance.get(`reservations`);
        return data;
    },
    async deleteReservation(id: string) {
        const res = await instance.delete(`reservations/${id}`);
        return res;
    }
}