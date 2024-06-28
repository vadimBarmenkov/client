import {FC} from 'react'
import ErrorPage from '../pages/ErrorPage';
import {useClient} from '../hooks/useClient';

interface Props {
    children: JSX.Element
}

export const ProtectedWithClient: FC<Props> = ({children}) => {
    const isClient = useClient();
    return (
        <>
            {isClient ? (children) : <ErrorPage/>}
        </>
    )
}
