import React, {FC, useState} from "react";
import {IUserData} from "../types/types";
import {AuthService} from "../services/auth.service";
import {toast} from "react-toastify";
import {setTokenToLocalStorage} from "../healpers/localstorage.helper";
import {useAppDispatch} from "../store/hooks";
import {login} from "../store/user/user.slice";
import {useNavigate} from "react-router-dom";
import {Button} from "@material-tailwind/react";


const Auth: FC = () => {

    const [userData, setUserData] = useState<IUserData>({email: '', name: '', tel: '', passwordHash: ''});
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            const data = await AuthService.login(userData);
            if (data) {
                setTokenToLocalStorage('token', data.token);
                dispatch(login(data));
                toast.success("Авторизация успешно");
                navigate('/');
            }

        } catch (err: any) {
            const error = err.response?.data.message;
            toast.error(error.toString());
        }
    }

    const registrationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            const data = await AuthService.registration(userData);
            if (data) {
                toast.success("Аккаунт успешно создан");
                setIsLogin(!isLogin);
            }
        } catch (err: any) {
            const error = err.response?.data.message;
            toast.error(error.toString());
        }
    }

    return (
        <div className="mt-40 flex flex-col justify-center items-center bg-white text-black">
            <h1 className="text-center text-xl mb-10">
                {isLogin ? 'Войти' : 'Регистрация'}
            </h1>
            <form
                onSubmit={isLogin ? loginHandler : registrationHandler}
                className="flex w-1/3 flex-col mx-auto gap-5">
                <input onChange={(e) => setUserData({...userData, email: e.target.value})} value={userData.email}
                       type="text" className="input" placeholder="Email"/>
                {!isLogin && (
                    <input onChange={(e) => setUserData({...userData, name: e.target.value})} value={userData.name}
                           type="text" className="input" placeholder="Имя"/>)}
                {!isLogin && (
                    <input onChange={(e) => setUserData({...userData, tel: e.target.value})} value={userData.tel}
                           type="tel" className="input" placeholder="Телефон"/>)}
                <input onChange={(e) => setUserData({...userData, passwordHash: e.target.value})}
                       value={userData.passwordHash} type="password" className="input" placeholder="Пароль"/>
                <Button
                    type="submit"
                    variant="gradient"
                    size="sm"
                    className="hidden lg:inline-block">
                    <span>{isLogin ? 'Войти' : 'Создать'}</span>
                </Button>
            </form>
            <div className="flex justify-center mt-5">
                {
                    isLogin ? (
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-gray-700 hover:text-gray-900">Нет аккауна? Создай его.</button>
                    ) : (
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-gray-700 hover:text-gray-900">Уже есть аккаунт? Войти.</button>
                    )
                }
            </div>
        </div>
    );
};

export default Auth;