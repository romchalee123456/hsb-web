import axios from 'axios';
import { useCookies } from 'vue3-cookies';
import router from './router';
import apiName from './currentName';
const { cookies } = useCookies();
let isRefreshing = false;
let refreshSubscribers = [];

const instance = axios.create({
    baseURL: apiName+'/api', // Replace with your API's base URL
    headers: {
        'Content-Type': 'application/json'
        // You can add more default headers here if needed
    }
});

instance.interceptors.request.use(
    async (config) => {
        // Skip adding Authorization header if the request is anonymous
        if (config.isAnonymous) return config;

        const token = cookies.get("accessToken");
        if (token) {
            config.headers["Authorization"] = "Bearer " + token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const { config, response: { status } } = error;
        const originalRequest = config;

        if (status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // If a token refresh is already in progress, queue the request
                return new Promise((resolve) => {
                    refreshSubscribers.push((token) => {
                        originalRequest.headers['Authorization'] = 'Bearer ' + token;
                        resolve(instance(originalRequest));
                    });
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const { data } = await refreshAccessToken(); // Replace this with your token refresh logic
                const newToken = data.accessToken;

                // Update the Authorization header with the new token for future requests
                cookies.set("accessToken", newToken, { path: '/' }); // Store the new token in cookies

                // Update the Authorization header for the current request
                originalRequest.headers['Authorization'] = 'Bearer ' + newToken;

                // Resolve all subscribers with the new token
                resolveRefreshSubscribers(newToken);

                isRefreshing = false;

                return instance(originalRequest);
            } catch (refreshError) {
                isRefreshing = false;

                // Check if the refresh token request returned a 403
                if (refreshError.response && refreshError.response.status === 403) {
                    handleLogout(); // Log the user out
                }

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

function resolveRefreshSubscribers(token) {
    refreshSubscribers.forEach((callback) => callback(token));
    refreshSubscribers = [];
}

async function refreshAccessToken() { 
    // Your logic to refresh the access token
    const accessRefreshToken = cookies.get("accessRefreshToken");
    return instance.post('/auth/refresh', { refreshToken: accessRefreshToken });
}

function handleLogout() {
    

    // Optionally redirect to the login page
     router.push('/login'); // Uncomment if using Vue Router
}

export default instance;
