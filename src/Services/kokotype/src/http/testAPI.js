import { $authHost, $host } from ".";
import { refreshToken } from "./authAPI";
import All_Routes from "../utils/consts";

export const fetchTest = async (options) => {
    try {
        
        const { data } = await $host.post('api/Test/getTest', options);
        return data;
    } catch (e) {
        console.log('Invalid fetch test', e);
    }
    return null;
};

export const setResult = async (options, navigate) => {
    try {
        const {data} = await $authHost.post('api/Test/setResult', options).catch(async function  (err) {
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
    catch (e) {
        console.log('result not saved', e);
    }
    return null;
}

export const fetchResults = async(options, navigate) => {
    try
    { 
        const {data} = await $authHost.post('api/Test/getStats', options).catch(async function  (err) {
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
    catch(e){
        console.log(e);
    }
}

export const getBest = async(options, navigate) => {
    try
    { 
        const {data} = await $authHost.post('api/Test/getBest', options).catch(async function  (err) {
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
    catch(e){
        console.log(e);
    }
}