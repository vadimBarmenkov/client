import {FC} from 'react';
import {Outlet} from "react-router-dom"
import Header from "../components/Header";
import {useAuth} from '../hooks/useAuth';
import {Chat} from '../components/Chat';

const Layout: FC = () => {

    const isAuth = useAuth();

    return (
        <div className="min-h-screen bg-slate-900 font-roboto text-white pb-20">
            <Header/>
            <div className="container">
                <Outlet/>
            </div>
            {isAuth && <Chat/>}
        </div>
    );
};

export default Layout;