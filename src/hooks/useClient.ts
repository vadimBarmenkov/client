import {useAppSelector} from "../store/hooks"

export const useClient = (): boolean => {
    const role = useAppSelector((state) => state.user.user?.role);
    if (role === 'client')
        return true;

    return false;
}