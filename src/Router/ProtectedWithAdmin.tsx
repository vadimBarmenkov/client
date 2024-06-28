import {FC} from 'react'
import ErrorPage from '../pages/ErrorPage';
import {useAdmin} from '../hooks/useAdmin';

interface Props {
    children: JSX.Element
}

export const ProtectedWithAdmin: FC<Props> = ({children}) => {
    const isAdmin = useAdmin();
    return (
        <>
            {isAdmin ? (children) : <ErrorPage/>}
        </>
    )
}
