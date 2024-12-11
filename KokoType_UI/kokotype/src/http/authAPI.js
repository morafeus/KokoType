import { $host } from ".";
import { jwtDecode } from "jwt-decode";

export const refreshToken = async () => {

    try
    {
        const RefreshToken = localStorage.getItem('refresh-token');
        const decoded = jwtDecode(RefreshToken);
        const Id = decoded.Id;
        console.log('token : ' +decoded.RefreshToken)
        const {data} = await $host.post('api/User/refresh', {Id, RefreshToken});
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('refresh-token', data.refreshToken);
    }
    catch
    {
        console.log('401 refresh');
    }
}

export const fetchUser = async ({userName, password}) => {
    try {
        
        const { data } = await $host.post('api/User/signin', {userName, password});
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('refresh-token', data.refreshToken);
        const decodedAccessToken = jwtDecode(data.accessToken);
        return decodedAccessToken;
    } catch (e) {
        console.log('Invalid login', e);
    }
    return null;
}

export const registration = async ({ userName, password, email }) => {
    try {
        const { data } = await $host.post('api/User/signup', { userName, password, email });
        return data;
    } catch (e) {
        // Проверяем, есть ли сообщение в ответе
        const message = e.response && e.response.data ? e.response.data.message : "An unexpected error occurred.";
        return { error: message };
    }
};