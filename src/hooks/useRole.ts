import {useAppSelector} from "../store/hooks"

export const useRole = (): string => {
    const role = useAppSelector((state) => state.user.user?.role);
    if (role)
        return role;

    return '';
}