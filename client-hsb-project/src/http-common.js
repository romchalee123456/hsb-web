import axios from 'axios'
import { useCookies } from 'vue3-cookies';
const { cookies } = useCookies();

const instance = axios.create({
    baseURL: 'http://localhost:3000/api', // Replace with your API's base URL
    headers: {
        'Content-Type': 'application/json'
        // You can add more default headers here if needed
    }
});

export default instance;
