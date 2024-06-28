import {updateInstance} from "../api/axios.api";

export function getTokenFromLocalStorage(): string {
    const data = localStorage.getItem('token');
    const token: string = data ? JSON.parse(data) : '';

    return token;
}

export function setTokenToLocalStorage(key: string, token: string): void {
    localStorage.setItem(key, JSON.stringify(token));
    updateInstance();
}

export function removeTokenFromLocalStorage(key: string): void {
    localStorage.removeItem(key);
}