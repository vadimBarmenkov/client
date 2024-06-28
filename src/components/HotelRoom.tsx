import {Button, Carousel, Dialog, DialogBody, DialogFooter, DialogHeader, Typography} from '@material-tailwind/react'
import {FC, useState} from 'react'
import {useAdmin} from '../hooks/useAdmin';
import {useClient} from '../hooks/useClient';
import {useNavigate} from 'react-router-dom';
import {ResevationService} from '../services/reservation.service';

interface IHotelRoom {
    images: string[];
    title: string;
    description: string;
    hotelId: string | undefined;
    _id: string | undefined;
}

export const HotelRoom: FC<IHotelRoom> = ({title, description, images, hotelId, _id}) => {

    const dateNow = new Date();
    const isAdmin = useAdmin();
    const isClient = useClient();
    const [open, setOpen] = useState(false);
    const [startDate, setStartDate] = useState<string>(new Date().toLocaleDateString('en-CA'));
    const [endDate, setEndDate] = useState<string>(new Date(dateNow.setDate(dateNow.getDate() + 7)).toLocaleDateString('en-CA'));
    const navigate = useNavigate();

    const handleOpen = () => setOpen(!open);

    const reservRoom = (roomId: string | undefined) => {
        ResevationService.create({
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            roomId: roomId,
            hotelId: hotelId
        })
        navigate('/reservation');
    }


    return (
        <div key={_id} className='mt-8 mb-8'>
            <Carousel className="rounded-xl mb-2 h-64">
                {images.map((src: string | undefined) =>
                    <img
                        key={src}
                        src={src}
                        alt="image 1"
                        className="h-full w-full object-cover"
                    />
                )}
            </Carousel>
            <Typography variant="h4" color="blue-gray" className="mb-2 opacity-75">
                {title}
            </Typography>
            <Typography color="gray" className="mb-8 font-normal">
                {description}
            </Typography>
            {isAdmin ? (
                    <div className="flex items-center justify-end gap-x-1">
                        <Button
                            onClick={() => {
                            }}
                            variant="text"
                            size="sm"
                            className="hidden lg:inline-block"
                        >
                            <span>Редактировать</span>
                        </Button>
                    </div>
                )
                :
                (
                    <div className="flex items-center justify-end gap-x-1">
                        <Button
                            onClick={() => {
                                isClient ? handleOpen() : navigate('../auth')
                            }}
                            variant="gradient"
                            size="sm"
                            className="hidden lg:inline-block"
                        >
                            <span>Забронировать</span>
                        </Button>
                        <Dialog open={open} handler={handleOpen}>
                            <DialogHeader>Укажите дату начала и окончания бронирования</DialogHeader>
                            <DialogBody>
                                <div className="mb-2 flex items-center">
                                    <div className="relative">
                                        <div
                                            className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                                 xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                                 viewBox="0 0 20 20">
                                                <path
                                                    d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                                            </svg>
                                        </div>
                                        <input
                                            value={startDate.toString()}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            name="start"
                                            type="date"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Select date start"/>
                                    </div>
                                    <span className="mx-4 text-gray-500">до</span>
                                    <div className="relative">
                                        <div
                                            className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                                 xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                                 viewBox="0 0 20 20">
                                                <path
                                                    d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                                            </svg>
                                        </div>
                                        <input
                                            value={endDate?.toString()}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            name="end"
                                            type="date"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Select date end"/>
                                    </div>
                                </div>
                            </DialogBody>
                            <DialogFooter>
                                <Button
                                    variant="text"
                                    color="red"
                                    onClick={handleOpen}
                                    className="mr-1"
                                >
                                    <span>Отмена</span>
                                </Button>
                                <Button variant="gradient" color="green" onClick={() => {
                                    reservRoom(_id);
                                    handleOpen();
                                }}>
                                    <span>Подтвердить</span>
                                </Button>
                            </DialogFooter>
                        </Dialog>
                    </div>

                )}
        </div>
    )
}
