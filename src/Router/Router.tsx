import {createBrowserRouter} from "react-router-dom";
import Layout from "../pages/Layout";
import ErrorPage from "../pages/ErrorPage";
import SearchPage from "../pages/SearchPage";
import Auth from "../pages/Auth";
import CreateHotel from "../pages/CreateHotel";
import HotelsList from "../pages/HotelsList";
import {Hotel} from "../pages/Hotel";
import CreateHotelRoom from "../pages/CreateHotelRoom";
import {UsersList} from "../pages/UsersList";
import {Reservation} from "../pages/Reservation";
import {EditHotel} from "../pages/EditHotel";
import {ProtectedWithAdmin} from "./ProtectedWithAdmin";
import {ProtectedWithClient} from "./ProtectedWhithClient";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                index: true,
                element: <HotelsList/>
            },
            {
                path: 'hotels',
                element: <HotelsList/>
            },
            {
                path: 'hotels/:id',
                element: <Hotel/>
            },
            {
                path: 'hotels/:id/edit',
                element: <ProtectedWithAdmin>
                    <EditHotel/>
                </ProtectedWithAdmin>
            },
            {
                path: 'hotels/:id/create-hotel-room',
                element: <ProtectedWithAdmin>
                    <CreateHotelRoom/>
                </ProtectedWithAdmin>
            },
            {
                path: 'search-room',
                element: <SearchPage/>
            },
            {
                path: 'auth',
                element: <Auth/>
            },
            {
                path: 'create-hotel',
                element: <ProtectedWithAdmin>
                    <CreateHotel/>
                </ProtectedWithAdmin>
            },
            {
                path: 'users-list',
                element: <ProtectedWithAdmin>
                    <UsersList/>
                </ProtectedWithAdmin>
            },
            {
                path: 'reservation',
                element: <ProtectedWithClient>
                    <Reservation/>
                </ProtectedWithClient>
            }
        ]
    },
])