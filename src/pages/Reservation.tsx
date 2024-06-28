import {Card, CardBody, Chip, IconButton, Tooltip, Typography} from '@material-tailwind/react';
import {FC, useEffect, useState} from 'react'
import {ResevationService} from '../services/reservation.service';

interface IReservation {
    _id: string;
    hotelId: string;
    roomId: string;
    dateStart: Date;
    dateEnd: Date;
    userId: string;
}

export const Reservation: FC = () => {


    const TABLE_HEAD = ["ID", "Дата начала:", "Дата окончания:", "Отель", ""];
    const [tableRows, setTableRows] = useState<IReservation[]>([]);


    async function fetchReservation() {
        const data = await ResevationService.getUserReservations();
        setTableRows(data);
    }

    async function removeReserv(reservId: string) {
        await ResevationService.deleteReservation(reservId);
        fetchReservation();
    }

    useEffect(() => {
        fetchReservation();
    }, []);


    return (
        <Card className="h-full w-full">
            <CardBody className="px-0">
                <table className="mt-4 w-full min-w-max table-auto text-left">
                    <thead>
                    <tr>
                        {TABLE_HEAD.map((head) => (
                            <th
                                key={head}
                                className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                            >
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70">
                                    {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {tableRows.map(
                        ({_id, hotelId, dateStart, dateEnd}, index) => {
                            const isLast = index === tableRows.length - 1;
                            const classes = isLast
                                ? "p-4"
                                : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={_id}>
                                    <td className={classes}>
                                        <div className="flex items-center gap-3">
                                            <div className="flex flex-col">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {_id}
                                                </Typography>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="flex flex-col">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {new Date(dateStart).toLocaleDateString('en-CA')}
                                            </Typography>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {new Date(dateEnd).toLocaleDateString('en-CA')}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <div className="w-max">
                                            <Chip
                                                variant="ghost"
                                                size="sm"
                                                value={hotelId}
                                                color={"blue-gray"}
                                            />
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <Tooltip content="Оменить">
                                            <IconButton
                                                variant="text"
                                                onClick={() => removeReserv(_id)}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                                                </svg>
                                            </IconButton>
                                        </Tooltip>
                                    </td>
                                </tr>
                            );
                        },
                    )}
                    </tbody>
                </table>
            </CardBody>
        </Card>
    )
}
