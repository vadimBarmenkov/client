import {useAppSelector} from "../store/hooks"

export const useAdmin = (): boolean => {
    const role = useAppSelector((state) => state.user.user?.role);
    if (role === 'admin')
        return true;

    return false;
}