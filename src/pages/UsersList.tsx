import {FC, useEffect, useState} from 'react'
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {PencilIcon, UserPlusIcon} from "@heroicons/react/24/solid";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Chip,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    IconButton,
    Input,
    Option,
    Select,
    Tooltip,
    Typography
} from "@material-tailwind/react";
import {UsersService} from '../services/users.service';
import {IUserData} from '../types/types';

interface IUser {
    _id: string;
    name: string;
    email: string;
    contactPhone: string;
    role: string;
}

export const UsersList: FC = () => {

    const TABLE_HEAD = ["ФИО", "Телефон", "User ID", "Роль", ""];
    const [tableRows, setTableRows] = useState<IUser[]>([]);
    const [open, setOpen] = useState(false);
    const [userData, setUserData] = useState<IUserData>({
        email: '',
        name: '',
        tel: '',
        passwordHash: '',
        role: 'client'
    });


    const handleOpen = () => setOpen(!open);

    async function createNewUser() {
        await UsersService.create(userData);
        setUserData({email: '', name: '', tel: '', passwordHash: ''});
        fetchUsers();
    }

    async function fetchUsers() {
        const data = await UsersService.getUsers();
        setTableRows(data);
    }

    useEffect(() => {
        fetchUsers();
    }, []);


    return (
        <div>
            <Card className="h-full w-full">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-8 flex items-center justify-between gap-8">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Пользователи
                            </Typography>
                        </div>
                        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                            <Button
                                className="flex items-center gap-3"
                                size="sm"
                                onClick={handleOpen}
                            >
                                <UserPlusIcon strokeWidth={2} className="h-4 w-4"/> Новый пользователь
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <div className="w-full md:w-72">
                            <Input
                                label="Поиск"
                                icon={<MagnifyingGlassIcon className="h-5 w-5"/>} crossOrigin={undefined}/>
                        </div>
                    </div>
                </CardHeader>
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
                            ({name, email, contactPhone, role, _id}, index) => {
                                const isLast = index === tableRows.length - 1;
                                const classes = isLast
                                    ? "p-4"
                                    : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={name}>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {name}
                                                    </Typography>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal opacity-70"
                                                    >
                                                        {email}
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
                                                    {contactPhone}
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {_id}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <div className="w-max">
                                                <Chip
                                                    variant="ghost"
                                                    size="sm"
                                                    value={role}
                                                    color={"blue-gray"}
                                                />
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <Tooltip content="Редактировать">
                                                <IconButton variant="text">
                                                    <PencilIcon className="h-4 w-4"/>
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
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Укажите дату начала и окончания бронирования</DialogHeader>
                <DialogBody>
                    <div
                        className="flex w-1/3 flex-col mx-auto gap-5">
                        <Input onChange={(e) => setUserData({...userData, email: e.target.value})}
                               value={userData.email} type="text" className="w-full" label="Email"
                               crossOrigin={undefined}/>
                        <Input onChange={(e) => setUserData({...userData, name: e.target.value})} value={userData.name}
                               type="text" className="w-full" label="Имя" crossOrigin={undefined}/>
                        <Input onChange={(e) => setUserData({...userData, tel: e.target.value})} value={userData.tel}
                               type="tel" className="w-full" label="Телефон" crossOrigin={undefined}/>
                        <Input onChange={(e) => setUserData({...userData, passwordHash: e.target.value})}
                               value={userData.passwordHash} type="password" className="w-full" label="Пароль"
                               crossOrigin={undefined}/>
                        <Select
                            variant="outlined"
                            label="Роль"
                            onChange={(e) => setUserData({...userData, role: e})}
                        >
                            <Option value='admin'>admin</Option>
                            <Option value='manager'>manager</Option>
                            <Option value='client'>client</Option>
                        </Select>
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
                        createNewUser();
                        handleOpen();
                    }}>
                        <span>Подтвердить</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    )
}
