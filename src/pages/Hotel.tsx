import {Button, Carousel, Spinner, Typography} from '@material-tailwind/react'
import {FC, useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {HotelService} from '../services/hotel.service';
import {IResponseHotelData} from '../types/types';
import {useAdmin} from '../hooks/useAdmin';
import {HotelRoomService} from '../services/hotel-room.service';

import {HotelRoom} from '../components/HotelRoom';

export const Hotel: FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const isAdmin = useAdmin();
    const {id} = useParams();
    const [hotel, setHotel] = useState<IResponseHotelData>();
    const [hotelRooms, setHotelRooms] = useState<any[]>([]);


    let navigate = useNavigate();


    async function fetchHotel() {
        setIsLoading(true);
        const hotelData = await HotelService.getHotelById(id);
        setHotel(hotelData);
        const hotelRoomsData = await HotelRoomService.getHotelRooms(id);
        setHotelRooms(hotelRoomsData);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchHotel();
    }, [])

    const editHotel = () => {
        navigate('edit');
    }

    return (
        <div className="mt-10 flex flex-col justify-center items-center bg-slate-900 text-black">
            {isLoading
                ? <Spinner className="h-16 w-16 text-gray-900/50"/>
                : <div>
                    <Carousel className="rounded-xl mb-2 h-64">
                        {hotel?.images.map((src) =>
                            <img
                                key={src}
                                src={src}
                                alt="image 1"
                                className="h-full w-full object-cover"
                            />
                        )}
                    </Carousel>
                    <Typography variant="h4" color="blue-gray" className="mb-2">
                        {hotel?.title}
                    </Typography>
                    <Typography color="gray" className="mb-8 font-normal">
                        {hotel?.description}
                    </Typography>
                    {isAdmin && (
                        <div className="flex items-center justify-end gap-x-1">
                            <Button
                                onClick={editHotel}
                                variant="text"
                                size="sm"
                                className="hidden lg:inline-block"
                            >
                                <span>Редактировать</span>
                            </Button>
                            <Button
                                onClick={() => navigate(`/hotels/${id}/create-hotel-room`)}
                                variant="gradient"
                                size="sm"
                                className="hidden lg:inline-block"
                            >
                                <span>Добавить номер</span>
                            </Button>
                        </div>)
                    }
                    <div>
                        {hotelRooms.map((room) => <HotelRoom
                            key={room._id}
                            title={room.title}
                            images={room.images}
                            description={room.description}
                            hotelId={id}
                            _id={room._id}/>)}
                    </div>
                </div>
            }
        </div>
    )
}
