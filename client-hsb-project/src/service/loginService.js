import http from '@/http-common';
import { useCookies } from 'vue3-cookies';
import { useAuthStore } from '@/assets/stores/auth';
const { cookies } = useCookies();

const getSevenDay = () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

export default {
  isLoggedIn() {
    var authStore = useAuthStore();
    return authStore.isLoggedIn;
    // const accessToken = localStorage.getItem('accessToken');
    // return !!accessToken; // Returns true if accessToken exists, false otherwise
  },
  async login(email, password) {
    try {
      const response = await http.post('/auth/signin', {
        email: email,
        password: password,
      });
      const data = await response.data.data;
      // Set the cookie
       cookies.set('accessToken', data.token, { expires: getSevenDay() });

       var authStore = useAuthStore();

       authStore.logout();

      return response.data;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  },
};
