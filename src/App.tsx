import {RouterProvider} from "react-router-dom";
import {router} from "./Router/Router";
import {useAppDispatch} from "./store/hooks";
import {getTokenFromLocalStorage} from "./healpers/localstorage.helper";
import {AuthService} from "./services/auth.service";
import {login, logout} from "./store/user/user.slice";
import {useEffect} from "react";

function App() {

    const dispatch = useAppDispatch();

    const checkAuth = async () => {
        const token = getTokenFromLocalStorage()

        if (token) {
            const data = await AuthService.getMe();

            if (data) {
                dispatch(login(data));
            } else {
                dispatch(logout())
            }
        }
    }

    useEffect(() => {
        checkAuth();
    }, [])

    return (<RouterProvider router={router}/>)
}

export default App
