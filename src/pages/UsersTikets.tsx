import {Card, Typography} from '@material-tailwind/react'
import {FC, useState} from 'react'
import {IResponseUserData, ISupportRequest} from '../types/types';

export const UsersTikets: FC = () => {

    const TABLE_HEAD = ["Пользователь", "Job", "Статус", ""];
    const [supportRequests, setSupportRequests] = useState<{
        supportRequest: ISupportRequest,
        User: IResponseUserData
    }[]>([]);

    async function fetchSupportRequests() {

    }

    return (
        <div>
            <Card className="h-full w-full overflow-scroll">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                    <tr>
                        {TABLE_HEAD.map((head) => (
                            <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {supportRequests.map(({name, job, date}, index) => (
                        <tr key={name} className="even:bg-blue-gray-50/50">
                            <td className="p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal">
                                    {name}
                                </Typography>
                                <Typography variant="small" color="blue-gray" className="font-normal opacity-70"
                                >
                                    {email}
                                </Typography>
                            </td>
                            <td className="p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal">
                                    {job}
                                </Typography>
                            </td>
                            <td className="p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal">
                                    {date}
                                </Typography>
                            </td>
                            <td className="p-4">
                                <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                                    Edit
                                </Typography>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </Card>
        </div>
    )
}
