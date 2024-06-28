import {useAppSelector} from "../store/hooks"

export const useUserId = (): string => {
    const id = useAppSelector((state) => state.user.user?.id);
    if (id)
        return id;

    return '';
}