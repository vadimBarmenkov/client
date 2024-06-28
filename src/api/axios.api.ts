import axios from "axios";
import {getTokenFromLocalStorage} from "../healpers/localstorage.helper";

export let instance = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        Authorization: 'Bearer ' + getTokenFromLocalStorage(),
    }
})

export const updateInstance = () => {
    instance = axios.create({
        baseURL: 'http://localhost:5000/api',
        headers: {
            Authorization: 'Bearer ' + getTokenFromLocalStorage(),
        }
    })
}