import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated')) || false,
    user: JSON.parse(localStorage.getItem('user')) || null,
  }),
  actions: {
    login(user) {
      this.isAuthenticated = true;
      this.user = user;
      localStorage.setItem('isAuthenticated', JSON.stringify(this.isAuthenticated));
      // localStorage.setItem('user', JSON.stringify(this.user));
    },
    logout() {
      this.isAuthenticated = false;
      this.user = null;
      localStorage.removeItem('isAuthenticated');
      // localStorage.removeItem('user');
    },
  },
});
