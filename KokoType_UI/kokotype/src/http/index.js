import axios from "axios";

const $host = axios.create({
    baseURL: 'https://localhost:7191/'
})


export {
    $host
}