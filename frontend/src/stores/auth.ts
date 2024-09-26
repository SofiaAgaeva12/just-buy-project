import {defineStore} from 'pinia'
import {useStorage} from "@vueuse/core";

export const useAuthStore = defineStore('auth', () => {
    let token = useStorage('justToken', '', localStorage);
    const isAuth = () => token.value.length > 0;
    const getToken = () => token;
    const setToken = (newToken: string) => {
        token.value = newToken;
        localStorage.setItem('justToken', newToken);
    }

    return {token, getToken, setToken, isAuth}
})
