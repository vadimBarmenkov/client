import {useAppSelector} from "../store/hooks"

export const useAdmin = (): boolean => {
    const role = useAppSelector((state) => state.user.user?.role);
    return role === 'admin';
}