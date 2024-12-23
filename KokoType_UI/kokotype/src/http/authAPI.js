import { $authHost, $host } from ".";
import { jwtDecode } from "jwt-decode";
import All_Routes from "../utils/consts";

export const refreshToken = async () => {

    try
    {
        const RefreshToken = localStorage.getItem('refresh-token');
        const decoded = jwtDecode(RefreshToken);
        const Id = decoded.Id;
        const {data} = await $host.post('api/User/refresh', {Id, RefreshToken});
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('refresh-token', data.refreshToken);
        const decodedAccessToken = jwtDecode(data.accessToken);
        console.log(decodedAccessToken);
        return decodedAccessToken;
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

export const fetchUsers = async(navigate) => {
    const data = await $authHost.post('api/User/getAll').catch(async function  (err) {
        const original = err.config;
        if (err.response.status === 401) {
            console.log('401');
            await refreshToken();
            $authHost.request(original).catch(() => {
                navigate(All_Routes.AUTH_PAGE);
            });
        
        }
    });
    return data.data;
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

export const updateUser = async({id, userName}, navigate) => {
    try{
        await $authHost.post('api/User/updateUser', {id, userName}).catch(async function  (err) {
            const original = err.config;
            if (err.response.status === 401) {
                console.log('401');
                await refreshToken();
                $authHost.request(original).catch(() => {
                    navigate(All_Routes.AUTH_PAGE);
                });
            
            }
        });
        const access = await refreshToken();
        return access;
    }
    catch(e) {
        console.log('invalid user', e);
    }
    return null;
};

export const updateLvl = async({id, exp}, navigate) => {
    try{
        await $authHost.post('api/User/updateLvl', {id, exp}).catch(async function  (err) {
            const original = err.config;
            if (err.response.status === 401) {
                console.log('401');
                await refreshToken();
                $authHost.request(original).catch(() => {
                    navigate(All_Routes.AUTH_PAGE);
                });
            
            }
        });
        const access =await refreshToken();
        return access;
    }
    catch(e) {
        console.log('invalid user', e);
    }
    return null;
};

export const getMe = async ({id, userName}, navigate) => {
    const data = await $authHost.post('api/User/getMe', {id, userName}).catch(async function  (err) {
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

export const logout = async ({id, userName}, navigate) => {
    const data = await $authHost.post('api/User/logout', {id, userName}).catch(async function  (err) {
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