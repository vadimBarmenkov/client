import {FC} from "react";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {BiHotel} from "react-icons/bi";
import {useAuth} from "../hooks/useAuth";
import {useAppDispatch} from "../store/hooks";
import {logout} from "../store/user/user.slice";
import {removeTokenFromLocalStorage} from "../healpers/localstorage.helper";
import {toast} from "react-toastify";
import {Button} from "@material-tailwind/react";
import {useRole} from "../hooks/useRole";

const Header: FC = () => {
    const isAuth = useAuth();
    const role = useRole();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const getMenuByRole = (role: string) => {
        switch (role) {
            case 'admin':
                return <ul className="flex items-center gap-5 ml-auto mr-10">
                    <li>
                        <NavLink to={'/'} className={({isActive}) => isActive ? 'text-black' : 'text-black/50'}>Все
                            гостиницы</NavLink>
                    </li>
                    <li>
                        <NavLink to={'search-room'}
                                 className={({isActive}) => isActive ? 'text-black' : 'text-black/50'}>Поиск
                            номера</NavLink>
                    </li>
                    <li>
                        <NavLink to={'create-hotel'}
                                 className={({isActive}) => isActive ? 'text-black' : 'text-black/50'}>Добавить
                            гостиницу</NavLink>
                    </li>
                    <li>
                        <NavLink to={'users-list'}
                                 className={({isActive}) => isActive ? 'text-black' : 'text-black/50'}>Пользователи</NavLink>
                    </li>
                </ul>

            case 'client':
                return <ul className="flex items-center gap-5 ml-auto mr-10">
                    <li>
                        <NavLink to={'/'} className={({isActive}) => isActive ? 'text-black' : 'text-black/50'}>Все
                            гостиницы</NavLink>
                    </li>
                    <li>
                        <NavLink to={'search-room'}
                                 className={({isActive}) => isActive ? 'text-black' : 'text-black/50'}>Поиск
                            номера</NavLink>
                    </li>
                    <li>
                        <NavLink to={'reservation'}
                                 className={({isActive}) => isActive ? 'text-black' : 'text-black/50'}>Мои
                            бронирования</NavLink>
                    </li>
                </ul>

            case 'manager':
                return <div></div>
        }
    }

    const logoutHandler = () => {
        dispatch(logout());
        removeTokenFromLocalStorage('token');
        toast.success("Выход. Успешно.");
        navigate('/');
    }

    return (
        <header className='flex items-center justify-between p-4 shadow-sm bg-withe backdrop-blur-sm'>
            <Link to="/">
                <BiHotel size={40}/>
            </Link>
            {/*Menu*/}
            {
                isAuth ? (
                        <nav>
                            {getMenuByRole(role)}
                        </nav>
                    )
                    :
                    (
                        <nav>
                            <ul className="flex items-center gap-5 ml-auto mr-10">
                                <li>
                                    <NavLink to={'/'}
                                             className={({isActive}) => isActive ? 'text-black' : 'text-black/50'}>Все
                                        гостиницы</NavLink>
                                </li>
                                <li>
                                    <NavLink to={'search-room'}
                                             className={({isActive}) => isActive ? 'text-black' : 'text-black/50'}>Поиск
                                        номера</NavLink>
                                </li>
                            </ul>
                        </nav>
                    )
            }

            {isAuth ? (
                <Button
                    onClick={() => logoutHandler()}
                    variant="gradient"
                    size="sm"
                    className="hidden lg:inline-block"
                >
                    <span>Выйти</span>
                </Button>
            ) : (
                <div>
                    <Button
                        onClick={() => navigate('/auth')}
                        variant="gradient"
                        size="sm"
                        className="hidden lg:inline-block"
                    >
                        <span>Войти/Зарегистрироваться</span>
                    </Button>
                </div>)}
        </header>
    );
};

export default Header;