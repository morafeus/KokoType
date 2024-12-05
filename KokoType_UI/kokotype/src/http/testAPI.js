import { $host } from ".";

export const fetchTest = async (options) => {
    try {
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const { data } = await $host.post('api/Test', options);
        return data;
    } catch (e) {
        console.log('Invalid fetch test', e);
    }
    return null;
};