import {FC} from 'react'
import {useAuth} from '../hooks/useAuth'
import ErrorPage from '../pages/ErrorPage';

interface Props {
    children: JSX.Element
}

export const ProtectedWithAuth: FC<Props> = ({children}) => {
    const isAuth = useAuth();
    return (
        <>
            {isAuth ? (children) : <ErrorPage/>}
        </>
    )
}
