import { $authHost } from ".";
import { refreshToken } from "./authAPI";
import All_Routes from "../utils/consts";

export const fetchBoard = async(navigate) => {
    const data = await $authHost.post('api/User/getTest').catch(async function  (err) {
        const original = err.config;
        if (err.response.status === 401) {
            console.log('401');
            await refreshToken();
            $authHost.request(original).catch(() => {
                navigate(All_Routes.AUTH_PAGE);
            });
        
        }
    });
    return data;
}