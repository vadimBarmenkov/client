export interface IUserData {
    email: string;
    name?: string;
    tel?: string;
    passwordHash: string;
    role?: string;
}

export interface IResponseUserData {
    email: string | undefined;
    name: string | undefined;
    tel: string | undefined;
    password: string | undefined;
    createdAt: string | undefined;
    updatedAt: string | undefined;
    __v?: number | undefined;
    _id?: string | undefined;
    message: string | undefined;
}

export interface IResponseLoginData {
    id: string;
    email: string;
    role: string;
    token: string;
}

export interface IResponseHotelData {
    title: string;
    description: string;
    images: string[];
    createdAt: string;
    updatedAt: string;
    __v?: number | undefined;
    _id?: string | undefined;
    message: string | undefined;
}

export interface IHotelData {
    title: string;
    description: string;
    images: string[];
}

export interface IHotelRoomData {
    hotelId: string | undefined;
    title: string;
    description: string;
    images: string[];
}

export interface IReservationData {
    hotelId: string | undefined;
    roomId: string | undefined;
    startDate: Date;
    endDate: Date;
}

export interface IImgCard {
    id: number;
    order: number;
    src: string;
}

export interface IMessage {
    _id: string;
    authorId: string;
    text: string;
    sentAt: Date;
    readAt: Date;
}

export interface ISupportRequest {
    _id: string;
    userId: string;
    createdAt: Date;
    messages: IMessage[];
    isActive: boolean;

}