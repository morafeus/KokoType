import { $authHost, $host } from ".";
import { refreshToken } from "./authAPI";
import All_Routes from "../utils/consts";

export const CreateLesson = async(options, navigate) => {
    console.log(options);
    const data = await $authHost.post('api/Lesson/addLesson', options).catch(async function  (err) {
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

export const GetAllLessons = async(options,navigate) => {
    const data = await $authHost.post('api/Lesson/getLessons',options).catch(async function  (err) {
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

export const DeleteLesson = async(options, navigate) => {
    console.log(options);
    const data = await $authHost.post('api/Lesson/deleteLesson', options).catch(async function  (err) {
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

export const CompleteLesson = async(options, navigate) => {
    console.log(options);
    const data = await $authHost.post('api/Lesson/completeLesson', options).catch(async function  (err) {
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