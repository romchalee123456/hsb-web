import axios from 'axios';
import apiName from './currentName';


const instance = axios.create({
    baseURL: apiName+'/api', // Replace with your API's base URL
    headers: {
        'Content-Type': 'application/json'
        // You can add more default headers here if needed
    }
});


export default instance;
